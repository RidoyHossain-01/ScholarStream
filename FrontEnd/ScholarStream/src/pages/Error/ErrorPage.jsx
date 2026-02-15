import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-300 via-slate-900 to-blue-300 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg w-full"
      >
        {/* Logo / Brand */}
        <h1 className="text-3xl font-bold mb-6">
          Scholar<span className="text-accent">Stream</span>
        </h1>

        {/* Error Code */}
        <h2 className="text-8xl font-extrabold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          404
        </h2>

        {/* Message */}
        <p className="mt-4 text-gray-300 text-lg">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg border border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white transition duration-300"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition duration-300 shadow-lg"
          >
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
