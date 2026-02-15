require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");




try {
  if (!process.env.FB_SERVICE_KEY) {
    throw new Error("FB_SERVICE_KEY is missing")
  }

  const decoded = Buffer.from(
    process.env.FB_SERVICE_KEY,
    'base64'
  ).toString('utf-8')

  const serviceAccount = JSON.parse(decoded)

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })

  console.log("Firebase Admin initialized successfully")
} catch (error) {
  console.error("Firebase initialization failed:", error.message)
}



const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb"); 

//middlewear
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_DOMAIN],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);


// jwt middlewares
const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1]
  // console.log(token)
  if (!token) return res.status(401).send({ message: 'Unauthorized Access!' })
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    req.tokenEmail = decoded.email
    // console.log(decoded)
    next()
  } catch (err) {
    // console.log(err)
    return res.status(401).send({ message: 'Unauthorized Access!', err })
  }
}









const uri = process.env.DB_URI;
// const uri = `mongodb://localhost:27017`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("scholar_stream_DB");
    const scholarShipCollection = db.collection("scholarships");
    const applicationCollection = db.collection("applications");
    const usersCollection = db.collection("users");
    const reviewsCollection = db.collection("reviews");

//role middleweares

//verify Admin
const verifyAdmin = async(req,res,next)=>{
    const email = req.tokenEmail;
    const user = await usersCollection.findOne({email});
    if ( user?.role!=="Admin") {
      return res.status(403).send({message:"Admin only action", role:user?.role})
    }
  
  
  next();
}


//verify Moderator
const verifyModerator = async(req,res,next)=>{
    const email = req.tokenEmail;
    const user = await usersCollection.findOne({email});
    if ( user?.role!=="Moderator") {
      return res.status(403).send({message:"Moderator only action", role:user?.role})
    }
  
  
  next();
}


    //getting all the scholarships
    app.get("/all-scholarship", async (req, res) => {
const {limit=0,skip=0} = req.query;
const searchText = req.query.search;
// console.log(req.query);

const query = {};
if (searchText) {
 

  query.$or=[
    {scholarshipName:{$regex:searchText,$options:'i'}},
    {universityName:{$regex:searchText,$options:'i'}},
    {degree:{$regex:searchText,$options:'i'}}

  ]
 
  
}



      const result = await scholarShipCollection.find(query).limit(Number(limit)).skip(Number(skip)).toArray();

const count = await scholarShipCollection.countDocuments()


      res.send({result, total:count});
    });

    //getting scholarship details of one data
    app.get("/scholarship/:id",verifyJWT, async (req, res) => {
      const id = req.params.id;
      const result = await scholarShipCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    













    //posting scholarships
    app.post("/scholarship",verifyJWT,verifyAdmin, async (req, res) => {
      const scholarshipData = req.body;
      const result = await scholarShipCollection.insertOne(scholarshipData);
      res.send(result);
    });

    //editing a scholarship as admin
    app.patch('/edit-scholarship/:id',verifyJWT,verifyAdmin,async(req,res)=>{
      const {id} = req.params;
      const scholarshipData = req.body;
      const result = await scholarShipCollection.updateOne({_id:new ObjectId(id)},{
      $set:scholarshipData
      })

      res.send(result)
      
    })

    //deleting scholarship as admin
    app.delete('/scholarship/:id',verifyJWT,verifyAdmin,async(req,res)=>{
      const {id} = req.params;
      const result = await scholarShipCollection.deleteOne({_id:new ObjectId(id)})
      res.send(result)
    })

//getting all application data as a moderator
app.get('/applications',verifyJWT,verifyModerator,async(req,res)=>{
 
 
  const result = await applicationCollection.find().toArray()
  res.send(result)
})






    //applying for a scholarship
    app.post("/application", async (req, res) => {
      const applicationInfo = req.body;
      const result = await applicationCollection.insertOne(applicationInfo);
      res.send(result);
    });


//getting my applications for scholarship
app.get('/my-applications',verifyJWT,async(req,res)=>{
  const email = req.tokenEmail
  // console.log(email);
  
   const result = await applicationCollection.find({"student.email":email}).toArray();
  
   
  res.send(result)
  
})

//deleting my application 
app.delete('/application/:id',async(req,res)=>{
  const {id} = req.params;
  const query = {_id:new ObjectId(id)}
  const result =  await applicationCollection.deleteOne(query);
  res.send(result)
})


//Scholarship review after compeletion
app.post('/reviews',verifyJWT, async(req,res)=>{
  const reviewData = req.body;
const result = await reviewsCollection.insertOne(reviewData);
res.send(result)
})


//getting all reviews
app.get('/all-reviews',verifyJWT,verifyModerator,async(req,res)=>{
  const result = await reviewsCollection.find().toArray();
  res.send(result)
})


//getting review by scholarship Id
app.get('/scholarship-review/:id',async(req,res)=>{
  const{id} = req.params;
  const query = {scholarshipId:id};
  const result = await reviewsCollection.find(query).toArray();
  res.send(result)
  // console.log(id);
  
})

//getting only my reviews
app.get('/my-reviews',verifyJWT, async(req,res)=>{
  const email  = req.tokenEmail;
  const result = await reviewsCollection.find({studentEmail:email}).toArray();
  res.send(result)
})


//edit a review
app.patch('/review/:id',verifyJWT,async(req,res)=>{
  const {id} = req.params;
  const query = {_id:new ObjectId (id)} 
  const update = req.body;
  const updatedReview ={
    $set:update
  }
  const result = await reviewsCollection.updateOne(query,updatedReview)
  res.send(result)
})


//delete a review
app.delete('/review/:id',async(req,res)=>{
  const {id} = req.params;
  const query = {_id:new ObjectId (id)};
  const result = await reviewsCollection.deleteOne(query);
  res.send(result)
})








    //adding user to usercollection
    //save or update user
    app.post("/users", async (req, res) => {
      const userData = req.body;
      userData.created_at = new Date().toISOString();
      userData.last_loggedIn = new Date().toISOString();
      userData.role = "Student";

      const query = {
        email: userData.email,
      };

      const alreadyExists = await usersCollection.findOne(query);
      if (alreadyExists) {
        const result = await usersCollection.updateOne(query, {
          $set: {
            last_loggedIn: new Date().toISOString(),
          },
        });
        return res.send(result);
      }
      //saving new userInfo
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

//as an admin, deleting an user
app.delete('/user/:email',verifyJWT,verifyAdmin,async(req,res)=>{
  const {email} = req.params;
  const query = {email:email};
  const userRecord = await admin.auth().getUserByEmail(email);
   await admin.auth().deleteUser(userRecord.uid)
   await usersCollection.deleteOne(query);
  res.send({
    success:true,
    message:"User deleted Successfully"
  })
})






    //getting the role of the user
    app.get("/user/role",verifyJWT, async (req, res) => {
      const email = req.tokenEmail;
      const result = await usersCollection.findOne({ email });
      res.send({ role: result?.role });
    });


//getting all the users
app.get('/users',verifyJWT,verifyAdmin,async(req,res)=>{
  const result = await usersCollection.find().toArray();
  res.send(result)
})

//changing user Role as admin
app.patch('/userRole/:id',verifyJWT,verifyAdmin,async(req,res)=>{
  const {id} = req.params;
  const query = {_id:new ObjectId(id)};
  const newRole = req.body;
  const updatedRole = {
    $set:newRole
  }
  // console.log(updatedRole);
  
  const result = await usersCollection.updateOne(query,updatedRole)
  res.send(result)


})







//updating status of the application from students(by Moderator)
app.patch('/application-status/:id',verifyJWT,verifyModerator,async(req,res)=>{
  const {id} = req.params;
  const {applicationStatus} = req.body;
  // console.log("Application status is",applicationStatus, "and ID is" , id);

const query = {_id:new ObjectId(id)}

  const updatedStatus = {
    $set:{
      applicationStatus
    }
  }
  const result = await applicationCollection.updateOne(query,updatedStatus)
  res.send(result)
  
})

//for feedback of a scholarship
app.patch('/application-feedback/:id',verifyJWT,verifyModerator,async(req,res)=>{
  const {id} = req.params;
  const {feedback} = req.body;

// console.log('this is the id',id,'and this is the feedback',feedback);


const query = {_id:new ObjectId(id)}

  const updatedFeedback = {
    $set:{
      feedback
    }
  }
  const result = await applicationCollection.updateOne(query,updatedFeedback)
  res.send(result)
  
})

//pipelines
app.get('/scholarships/subjects/stats',verifyJWT,verifyAdmin,async(req,res)=>{
  const pipeline = [
    {
      $group:{
        _id:'$degree',
        count:{$sum:1}
    }
  }
  ]
  const result = await scholarShipCollection.aggregate(pipeline).toArray();
  res.send(result)
})











    //payment endpoints
    app.post("/create-checkout-session",verifyJWT, async (req, res) => {
      const paymentInfo = req.body;
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: paymentInfo?.scholarshipName,
                description: paymentInfo?.universityName,
                images: [paymentInfo?.universityImage],
              },
              unit_amount:
                (paymentInfo?.serviceCharge + paymentInfo?.applicationFees) *
                100,
            },

            //quantity outside of price_data
            quantity: 1,
          },
        ],
        customer_email: paymentInfo?.studentEmail,
        mode: "payment",
        metadata: {
          scholarshipId: paymentInfo?.scholarshipId,
          applicationId: paymentInfo?.applicationId,
          scholarshipName: paymentInfo?.scholarshipName,

          universityName: paymentInfo?.universityName,
          applicationFees: paymentInfo?.applicationFees,
          serviceCharge: paymentInfo?.serviceCharge,
          applicationDate: paymentInfo?.applicationDate,
          studentName: paymentInfo?.studentName,
          studentEmail: paymentInfo?.studentEmail,
        },
        success_url: `${process.env.CLIENT_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_DOMAIN}/payment-failed`,
      });

      res.send({ url: session?.url });

      // console.log(paymentInfo);
    });

    //payment success
    app.post("/payment-success",verifyJWT, async (req, res) => {
      const { sessionId } = req.body;

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const applicationInsertedId = new ObjectId(
        session.metadata.applicationId,
      );

      const application = await applicationCollection.findOne({
        scholarshipId: session.metadata.scholarshipId,
        _id: applicationInsertedId,
      });

      //  console.log(application);

      if (session.status === "complete" && application) {
        const updatedInfo = {
          $set: {
            paymentStatus: "Paid",
            transactionId: session.payment_intent,
            paymentDate: new Date().toISOString().slice(0, 10),
          },
        };

        const updatedApplication = await applicationCollection.updateOne(
          { _id: applicationInsertedId },
          updatedInfo,
        );

        
        res.send({updatedApplication,scholarshipName:session?.metadata.scholarshipName,universityName:session?.metadata.universityName});
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!",
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
