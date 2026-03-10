import { motion } from "framer-motion";

import { FaSearch } from "react-icons/fa";
import Banner from "./HomePageElements/Banner/Banner";
import Container from "../../components/shared/Container";
import TopScholarships from "./HomePageElements/TopScholarships/TopScholarships";
import Heading from "../../components/shared/Heading";
import Partners from "../../components/Partners";

const Home = () => {
  return (
    <div className="space-y-24">
      {/* 1️⃣ Hero Banner */}
      <Container classes={"w-full"}>
        <Banner />
      </Container>

      {/* 2️⃣ Search Scholarships */}
      <Container>
        <section className="px-1 py-8">
          <div className="bg-base-200 p-6 rounded-xl flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Search scholarships by name, university, or degree"
              className="input input-bordered flex-1"
            />
            <button className="btn btn-primary flex items-center gap-2">
              <FaSearch /> Search
            </button>
          </div>
        </section>
      </Container>

      <Container>
        <Heading
          title={"Top Scholarships"}
          subtitle={
            "Handpicked scholarship opportunities from leading global universities — designed to support your academic journey and unlock your potential."
          }
        />
        <TopScholarships />
      </Container>

      {/* 5️⃣ Success Stories / Testimonials */}
      <Container>
        <section className="py-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-base-100 p-6 shadow-lg rounded-xl"
              whileHover={{ scale: 1.03 }}
            >
              <p className="mb-4 italic">
                "I got a fully funded scholarship thanks to ScholarStream!"
              </p>
              <h4 className="font-bold">Hridoy Hossain</h4>
              <p className="text-sm text-base-content/60">ETH Zurich</p>
            </motion.div>
            <motion.div
              className="bg-base-100 p-6 shadow-lg rounded-xl"
              whileHover={{ scale: 1.03 }}
            >
              <p className="mb-4 italic">
                "ScholarStream helped me find my dream university abroad."
              </p>
              <h4 className="font-bold">Raiyan Ahmed</h4>
              <p className="text-sm text-base-content/60">Sciences Po</p>
            </motion.div>
            <motion.div
              className="bg-base-100 p-6 shadow-lg rounded-xl"
              whileHover={{ scale: 1.03 }}
            >
              <p className="mb-4 italic">
                "The platform is super easy to use and very reliable."
              </p>
              <h4 className="font-bold">Sara Khan</h4>
              <p className="text-sm text-base-content/60">
                University of Tokyo
              </p>
            </motion.div>
          </div>
        </section>
      </Container>

      {/* 6️⃣ How It Works */}
      <Container>
        <section className="px-1 py-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-base-100 shadow rounded-xl">
              <h3 className="font-bold mb-2">1. Browse Scholarships</h3>
              <p>Search for scholarships by category, degree, or country.</p>
            </div>
            <div className="p-6 bg-base-100 shadow rounded-xl">
              <h3 className="font-bold mb-2">2. Apply Online</h3>
              <p>Submit your application directly through the platform.</p>
            </div>
            <div className="p-6 bg-base-100 shadow rounded-xl">
              <h3 className="font-bold mb-2">3. Payment & Feedback</h3>
              <p>Pay the application fees and get moderator feedback.</p>
            </div>
            <div className="p-6 bg-base-100 shadow rounded-xl">
              <h3 className="font-bold mb-2">4. Award & Success</h3>
              <p>Receive notifications about successful scholarship awards.</p>
            </div>
          </div>
        </section>
      </Container>

      {/* 7️⃣ FAQ */}
      <Container>
        <section className="px-1">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="p-4 bg-base-100 rounded-lg shadow">
              <summary className="cursor-pointer font-semibold">
                How to apply for a scholarship?
              </summary>
              <p className="mt-2">
                Simply click on "View Details" and follow the instructions to
                apply.
              </p>
            </details>
            <details className="p-4 bg-base-100 rounded-lg shadow">
              <summary className="cursor-pointer font-semibold">
                What payment methods are accepted?
              </summary>
              <p className="mt-2">
                Stripe is integrated for secure payment of application fees.
              </p>
            </details>
          </div>
        </section>
      </Container>

      {/* Our Partners */}
      <Container>
        <section className="py-8">
          <Partners />
        </section>
      </Container>

      {/* 8️⃣ Newsletter */}
      <section className="px-1 text-center py-12 bg-primary text-primary-content rounded-xl">
        <Container>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Subscribe for Updates
          </h2>
          <p className="mb-6 opacity-80">
            Get the latest scholarships directly in your inbox
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1 max-w-md bg-white/10 text-primary-content placeholder:text-primary-content/60 border-white/30"
            />
            <button className="btn btn-accent">Subscribe</button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
