import {
  FaGlobe,
  FaUserGraduate,
  FaUniversity,
  FaShieldAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About ScholarStream
          </h1>
          <p className="max-w-3xl mx-auto text-lg opacity-90">
            ScholarStream is a global scholarship discovery platform designed to
            connect ambitious students with verified academic opportunities from
            top universities worldwide.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to simplify scholarship discovery by providing a
            transparent, organized, and reliable system that empowers students
            to pursue higher education without financial barriers.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a world where every talented student has equal access to
            global educational opportunities, regardless of background or
            location.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold">What We Offer</h2>
          <p className="text-gray-500 mt-3">
            Everything you need to discover and apply for scholarships
            confidently.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="p-6 shadow-lg rounded-xl hover:shadow-xl transition">
            <FaUniversity className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">
              Verified Universities
            </h3>
            <p className="text-gray-600 text-sm">
              We partner with recognized institutions to ensure authenticity.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl hover:shadow-xl transition">
            <FaUserGraduate className="text-4xl text-indigo-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Student Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Manage applications and track your progress easily.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl hover:shadow-xl transition">
            <FaShieldAlt className="text-4xl text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Secure Applications</h3>
            <p className="text-gray-600 text-sm">
              Your data and applications are safely protected.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl hover:shadow-xl transition">
            <FaGlobe className="text-4xl text-purple-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Global Opportunities</h3>
            <p className="text-gray-600 text-sm">
              Access scholarships from universities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-600 mt-2">Active Scholarships</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">120+</h3>
            <p className="text-gray-600 mt-2">Partner Universities</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-green-600">10K+</h3>
            <p className="text-gray-600 mt-2">Students Assisted</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-linear-to-r from-indigo-600 to-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Scholarship Journey Today
        </h2>
        <p className="mb-6 opacity-90">
          Discover opportunities and take the next step toward your academic
          future.
        </p>
        <Link
          to={"/all-scholarships"}
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Explore Scholarships
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
