import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [universityName, setUniversityName] = useState("");
  const [scholarshipName, setScholarshipName] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    const fetchPayment = async () => {
      try {
        const { data } = await axiosSecure.post(
          `${import.meta.env.VITE_base_URL}/payment-success`,
          { sessionId },
        );
        setUniversityName(data?.universityName || "");
        setScholarshipName(data?.scholarshipName || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 shadow-2xl rounded-2xl p-8 md:p-12 max-w-lg w-full text-center border border-base-300"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <FaCheckCircle className="text-green-500 text-6xl md:text-7xl" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mt-6 text-base-content">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="text-base-content/70 mt-3 text-sm md:text-base">
          Your application payment at {universityName} for the {scholarshipName}{" "}
          has been completed successfully. You can now track your scholarship
          application status from your dashboard.
        </p>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/dashboard/my-applications">
            <button className="btn btn-success w-full md:w-auto">
              Go to Dashboard
            </button>
          </Link>

          <Link to="/">
            <button className="btn btn-outline w-full md:w-auto">
              Back to Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
