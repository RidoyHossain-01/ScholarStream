import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  FaArrowRight,
  FaClipboardCheck,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";

const HowToApply = () => {
  return (
    <section className=" py-12 px-4 md:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          How to Apply for a Scholarship
        </h2>
        <p className="text-base-content/70 md:text-lg">
          Follow these simple steps to apply for your desired scholarship
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Step 1 */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <FaUniversity className="text-4xl text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Browse Scholarships</h3>
          <p className="text-base-content/70">
            Explore scholarships on the All Scholarships page.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <CiSearch className="text-blue-600 text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">Search</h3>
          <p className="text-base-content/70">
            Click "View Details" to check eligibility and deadlines.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-base-100 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <FaCreditCard className="text-4xl text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Payment (if required)</h3>
          <p className="text-gray-600">
            Pay the application fee securely, if applicable.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <FaArrowRight className="text-4xl text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Submit Application</h3>
          <p className="text-gray-600">
            Track your application status in your Dashboard.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
