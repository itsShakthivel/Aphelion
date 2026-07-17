import AnimatedNumber from "../../ui/AnimatedNumbers/AnimatedNumber";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useSelector } from "react-redux";

const NetWorthCard = () => {

    const { netWorth } = useSelector(
        (state) => state.analytics
    );

    if (!netWorth) {

        return (

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8">

                <p className="text-slate-300">

                    Loading Net Worth...

                </p>

            </div>

        );

    }

    return (

        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl p-8 text-white">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-slate-400 text-sm uppercase tracking-widest">

                        Net Worth

                    </p>

                    <h1 className="text-5xl font-bold mt-3">

                        <AnimatedNumber
                            value={netWorth.netWorth}
                            prefix= "₹ "
                        />

                    </h1>

                </div>

                <div className="bg-green-500/20 p-4 rounded-full">

                    <FaArrowTrendUp
                        size={36}
                        className="text-green-400"
                    />

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">

                <div>

                    <p className="text-slate-400 text-sm">

                        Total Assets

                    </p>

                    <p className="text-2xl font-semibold mt-2">

                        <AnimatedNumber
                            value={netWorth.assets}
                            prefix="₹ "
                        />

                    </p>

                </div>

                <div>

                    <p className="text-slate-400 text-sm">

                        Liabilities

                    </p>

                    <p className="text-2xl font-semibold mt-2 text-red-400">

                        <AnimatedNumber
                            value={netWorth.liabilties}
                            prefix="₹ "
                        />
                            

                    </p>

                </div>

            </div>

        </div>

    );

};

export default NetWorthCard;