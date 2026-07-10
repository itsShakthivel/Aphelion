import { motion } from "framer-motion";

function FinancialHealth({ data }) {

    if (!data || !data.financialHealth) return null;

    const score = data.financialHealth.total;

    let color = "text-red-400";

    if (score >= 80)
        color = "text-emerald-400";
    else if (score >= 60)
        color = "text-yellow-400";
    else if (score >= 40)
        color = "text-orange-400";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, }}
            animate={{ opacity: 1, scale: 1, }}
            transition={{ duration: 0.5}}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-6"
        >
            <div className="flex items-center justify-between">

                <div>

                    <p className="text-slate-400">
                        Financial Health Score
                    </p>

                    <h1 className={`text-5xl font-bold mt-2 ${color}`}>
                        {score}
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Out of 100
                    </p>

                </div>

                <div className="w-28 h-28 rounded-full border-8 border-slate-700 flex items-center justify-center">

                    <span className={`text-3xl font-bold ${color}`}>
                        {score}
                    </span>

                </div>

            </div>
        </motion.div>
    );
}

export default FinancialHealth;