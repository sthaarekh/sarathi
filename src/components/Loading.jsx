import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="ml-4 text-lg font-semibold text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;
