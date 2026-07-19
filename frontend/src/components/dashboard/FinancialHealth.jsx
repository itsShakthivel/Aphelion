import { motion } from "framer-motion";
import {
    FaHeartPulse,
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaMinus,
} from "react-icons/fa6";

import Card from "../ui/Card";

function FinancialHealth({ data }) {

    if (!data?.financialHealth)
        return null;

    const {
        total,
        previousScore,
    } = data.financialHealth;

    const score = total ?? 0;

    const difference =
        previousScore !== undefined
            ? score - previousScore
            : 0;

    let accent = "danger";
    let textColor = "text-red-400";

    if (score >= 80) {
        accent = "success";
        textColor = "text-emerald-400";
    }
    else if (score >= 60) {
        accent = "warning";
        textColor = "text-yellow-400";
    }
    else if (score >= 40) {
        accent = "warning";
        textColor = "text-orange-400";
    }

    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.45,
            }}
        >

            <Card accent={accent}>

                <div className="flex items-center justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="icon-box">

                                <FaHeartPulse />

                            </div>

                            <div>

                                <p className="text-slate-400">

                                    Financial Health Score

                                </p>

                                <h2 className={`text-5xl font-bold mt-2 ${textColor}`}>

                                    {score}

                                </h2>

                                <p className="text-slate-500 mt-2">

                                    Out of 100

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col items-center">

                        <div
                            className={`
                                w-28
                                h-28
                                rounded-full
                                border-8
                                border-slate-700
                                flex
                                items-center
                                justify-center
                                ${textColor}
                            `}
                        >

                            <span className="text-3xl font-bold">

                                {score}

                            </span>

                        </div>

                        {previousScore !== undefined && (

                            <div className="flex items-center gap-2 mt-4 text-sm">

                                {difference > 0 && (
                                    <>
                                        <FaArrowTrendUp className="text-emerald-400" />
                                        <span className="text-emerald-400">
                                            +{difference}
                                        </span>
                                    </>
                                )}

                                {difference < 0 && (
                                    <>
                                        <FaArrowTrendDown className="text-red-400" />
                                        <span className="text-red-400">
                                            {difference}
                                        </span>
                                    </>
                                )}

                                {difference === 0 && (
                                    <>
                                        <FaMinus className="text-slate-400" />
                                        <span className="text-slate-400">
                                            No Change
                                        </span>
                                    </>
                                )}

                            </div>

                        )}

                    </div>

                </div>

            </Card>

        </motion.div>

    );

}

export default FinancialHealth;