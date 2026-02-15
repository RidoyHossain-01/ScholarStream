import React from "react";
import {
  FaArrowRight,
  FaClipboardCheck,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";

const HowToApply = () => {
  return (
    <section className="bg-base-200 py-12 px-4 md:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          How to Apply for a Scholarship
        </h2>
        <p className="text-gray-600 md:text-lg">
          Follow these simple steps to apply for your desired scholarship
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <FaUniversity className="text-4xl text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Browse Scholarships</h3>
          <p className="text-gray-600">
            Explore scholarships on the All Scholarships page.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <FaClipboardCheck className="text-4xl text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">View Details</h3>
          <p className="text-gray-600">
            Click "View Details" to check eligibility and deadlines.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <FaCreditCard className="text-4xl text-primary mb-4" />
          <h3 className="font-semibold text-xl mb-2">Payment (if required)</h3>
          <p className="text-gray-600">
            Pay the application fee securely, if applicable.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
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
