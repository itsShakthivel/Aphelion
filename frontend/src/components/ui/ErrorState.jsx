import { motion } from "framer-motion";

function ErrorState({

    title = "Something Went Wrong",

    message = "Unable to load data.",

    onRetry,

}) {

    return (

        <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            className="
                bg-red-950
                border
                border-red-800
                rounded-2xl
                p-8
                text-center
            "

        >

            <div className="text-5xl">

                ⚠️

            </div>

            <h2 className="text-white text-2xl font-bold mt-4">

                {title}

            </h2>

            <p className="text-red-300 mt-3">

                {message}

            </p>

            {onRetry && (

                <button

                    onClick={onRetry}

                    className="
                        mt-6
                        bg-red-600
                        hover:bg-red-500
                        px-6
                        py-2
                        rounded-lg
                        text-white
                    "

                >

                    Retry

                </button>

            )}

        </motion.div>

    );

}

export default ErrorState;