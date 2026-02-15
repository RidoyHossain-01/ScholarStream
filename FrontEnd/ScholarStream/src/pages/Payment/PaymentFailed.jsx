import { Link, useNavigate } from "react-router";
import { FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-white to-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 max-w-lg w-full text-center"
      >
        {/* Failed Icon */}
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center"
        >
          <FaTimesCircle className="text-red-500 text-6xl md:text-7xl" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mt-6 text-gray-800">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          Unfortunately, your payment was not completed. This may have happened
          due to cancellation or a transaction issue.
        </p>

        <p className="text-gray-500 text-sm mt-2">
          You can still find your application and pay from your dashboard.
        </p>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-error w-full md:w-auto"
          >
            Try Again
          </button>

          <Link to="/dashboard/my-applications">
            <button className="btn btn-success w-full md:w-auto">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
