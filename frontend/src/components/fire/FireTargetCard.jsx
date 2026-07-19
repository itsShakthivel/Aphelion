import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

const FireTargetCard = ({ planner }) => {

    if (!planner) return null;

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-zinc-900 to-zinc-900 p-6"

        >

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-orange-500/20 p-4 text-3xl text-orange-400">

                    <FaFire />

                </div>

                <div>

                    <p className="text-sm uppercase tracking-wider text-orange-300">

                        FIRE Target

                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-white">

                        ₹{planner.fireCorpus.toLocaleString()}

                    </h2>

                    <p className="mt-2 text-zinc-400">

                        Estimated Financial Independence Corpus

                    </p>

                </div>

            </div>

        </motion.div>

    );

};

export default FireTargetCard;