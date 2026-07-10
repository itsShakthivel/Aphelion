import { motion } from "framer-motion";

function LoadingSkeleton({className = ""}) {
    return (
        <motion.div
            animate={{
                opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className={`bg-slate-800 rounded-x1 ${className}`}
        />
    );
}

export default LoadingSkeleton;