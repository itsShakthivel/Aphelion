import { motion } from "framer-motion";

function EmptyState({

    title = "Nothing Here Yet",

    message = "Start by adding some data.",

    icon = "📭",

}) {

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-10
                flex
                flex-col
                items-center
                justify-center
                text-center
            "

        >

            <div className="text-6xl mb-5">

                {icon}

            </div>

            <h2 className="text-2xl font-bold text-white">

                {title}

            </h2>

            <p className="text-slate-400 mt-3">

                {message}

            </p>

        </motion.div>

    );

}

export default EmptyState;