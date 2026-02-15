import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Loader from "../../../../components/shared/Loader";
import ErrorPage from "../../../Error/ErrorPage";

const TopScholarships = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-scholarship"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_base_URL}/all-scholarship`,
      );
      return res.data; // return the whole data object
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  // Safely default to empty array
  const scholarShips = data?.result || [];

  // Sort by world rank and take top 6
  const topScholarships = [...scholarShips]
    .sort(
      (a, b) =>
        (a.universityWorldRank || Infinity) -
        (b.universityWorldRank || Infinity),
    )
    .slice(0, 6);

  return (
    <section className="px-1 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topScholarships.map((s) => (
          <motion.div
            key={s._id}
            className="card bg-base-100 shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <figure>
              <img
                src={s.universityImage}
                alt={s.scholarshipName}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{s.scholarshipName}</h3>
              <p>Category: {s.scholarshipCategory}</p>
              <p>Degree: {s.degree}</p>
              <p>Application Fees: ${s.applicationFees}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/scholarship/${s._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Link to={"/all-scholarships"} className="btn btn-primary mt-2 flex">
        See All Scholarships
      </Link>
    </section>
  );
};

export default TopScholarships;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { motion } from "framer-motion";

// import { Link } from "react-router";
// import Loader from "../../../../components/shared/Loader";
// import ErrorPage from "../../../Error/ErrorPage";

// const TopScholarships = () => {
//   const { data: scholarShips = [], isLoading, isError } = useQuery({
//     queryKey: ["all-scholarship"],
//     queryFn: async () => {
//       const {data} = await axios(
//         `${import.meta.env.VITE_base_URL}/all-scholarship`
//       );
//       return data.result;
//     },
//   });

//   // Sort by universityWorldRank ascending and take top 3
//   const topThreeScholarships = [...scholarShips]
//     .sort((a, b) => a.universityWorldRank - b.universityWorldRank)
//     .slice(0, 6);

//   if (isLoading) return <Loader/>;
//   if (isError) return <ErrorPage/>;

//   return (
//     <section className="px-1 mt-5">

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {topThreeScholarships.map((s) => (
//           <motion.div
//             key={s?._id}
//             className="card bg-base-100 shadow-xl overflow-hidden"
//             whileHover={{ scale: 1.05 }}
//           >
//             <figure>
//               <img
//                 src={s?.universityImage}
//                 alt={s?.scholarshipName}
//                 className="h-48 w-full object-cover"
//               />
//             </figure>
//             <div className="card-body">
//               <h3 className="card-title">{s?.scholarshipName}</h3>
//               <p>Category: {s?.scholarshipCategory}</p>
//               <p>Degree: {s?.degree}</p>
//               <p>Application Fees: ${s?.applicationFees}</p>
//               <div className="card-actions justify-end">
//                 <Link to={`/scholarship/${s?._id}`} className="btn btn-primary btn-sm">View Details</Link>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//       <Link to={'all-scholarships'} className="btn btn-primary mt-2 flex">See All Scholarships</Link>
//     </section>
//   );
// };

// export default TopScholarships;
