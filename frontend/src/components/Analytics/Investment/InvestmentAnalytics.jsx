import { useSelector } from "react-redux";

import {
    FaArrowTrendUp,
    FaRepeat,
} from "react-icons/fa6";

const formatCurrency = (
    value
) =>
    `₹ ${Number(
        value || 0
    ).toLocaleString(
        "en-IN"
    )}`;

const formatInvestmentType = (
    type
) => {

    const labels = {

        stock:
            "Stock",

        mutual_fund:
            "Mutual Fund",

        etf:
            "ETF",

        gold:
            "Gold",

        crypto:
            "Crypto",

        fd:
            "Fixed Deposit",

        real_estate:
            "Real Estate",

        bond:
            "Bond",

        other:
            "Other",

    };

    return (
        labels[type] ||
        "Other"
    );

};

const InvestmentAnalytics = () => {

    const {
        investmentAnalytics,
    } = useSelector(
        (state) =>
            state.analytics
    );

    const data =
        investmentAnalytics ||
        {
            total: 0,
            sip: 0,
            oneTime: 0,
            transactionCount: 0,
            byInvestment: [],
        };

    return (

        <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl p-6 text-white">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-400 text-sm">

                                Total Contributions

                            </p>

                            <p className="text-3xl font-bold mt-2">

                                {
                                    formatCurrency(
                                        data.total
                                    )
                                }

                            </p>

                        </div>

                        <div className="bg-green-500/20 p-3 rounded-full">

                            <FaArrowTrendUp
                                className="text-green-400"
                                size={24}
                            />

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl p-6 text-white">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-400 text-sm">

                                SIP Contributions

                            </p>

                            <p className="text-3xl font-bold mt-2">

                                {
                                    formatCurrency(
                                        data.sip
                                    )
                                }

                            </p>

                        </div>

                        <div className="bg-blue-500/20 p-3 rounded-full">

                            <FaRepeat
                                className="text-blue-400"
                                size={24}
                            />

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl p-6 text-white">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-400 text-sm">

                                One-Time Contributions

                            </p>

                            <p className="text-3xl font-bold mt-2">

                                {
                                    formatCurrency(
                                        data.oneTime
                                    )
                                }

                            </p>

                        </div>

                        <div className="bg-purple-500/20 p-3 rounded-full">

                            <FaArrowTrendUp
                                className="text-purple-400"
                                size={24}
                            />

                        </div>

                    </div>

                </div>

            </div>

            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl overflow-hidden text-white">

                <div className="p-6 border-b border-slate-700">

                    <div className="flex items-center justify-between gap-4">

                        <div>

                            <h3 className="text-xl font-semibold">

                                Investment Contributions

                            </h3>

                            <p className="text-sm text-slate-400 mt-1">

                                Transaction activity linked to your existing investments.

                            </p>

                        </div>

                        <div className="text-sm text-slate-400">

                            {
                                data.transactionCount
                            } transactions

                        </div>

                    </div>

                </div>

                {
                    data.byInvestment.length === 0
                        ? (

                            <div className="p-8 text-center text-slate-400">

                                No investment transactions found for this period.

                            </div>

                        )
                        : (

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-slate-800/80">

                                        <tr>

                                            <th className="text-left p-4 text-slate-300 font-medium">

                                                Investment

                                            </th>

                                            <th className="text-left p-4 text-slate-300 font-medium">

                                                Type

                                            </th>

                                            <th className="text-right p-4 text-slate-300 font-medium">

                                                Total

                                            </th>

                                            <th className="text-right p-4 text-slate-300 font-medium">

                                                SIP

                                            </th>

                                            <th className="text-right p-4 text-slate-300 font-medium">

                                                One-Time

                                            </th>

                                            <th className="text-right p-4 text-slate-300 font-medium">

                                                Transactions

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            data.byInvestment.map(
                                                (
                                                    investment
                                                ) => (

                                                    <tr
                                                        key={
                                                            investment.investmentId ||
                                                            investment.investmentName
                                                        }
                                                        className="border-t border-slate-700/70 hover:bg-slate-800/70 transition-colors duration-200"
                                                    >

                                                        <td className="p-4 font-medium text-white">

                                                            {
                                                                investment.investmentName
                                                            }

                                                        </td>

                                                        <td className="p-4 text-slate-400">

                                                            {
                                                                formatInvestmentType(
                                                                    investment.investmentType
                                                                )
                                                            }

                                                        </td>

                                                        <td className="p-4 text-right text-white font-semibold">

                                                            {
                                                                formatCurrency(
                                                                    investment.amount
                                                                )
                                                            }

                                                        </td>

                                                        <td className="p-4 text-right text-slate-300">

                                                            {
                                                                formatCurrency(
                                                                    investment.sip
                                                                )
                                                            }

                                                        </td>

                                                        <td className="p-4 text-right text-slate-300">

                                                            {
                                                                formatCurrency(
                                                                    investment.oneTime
                                                                )
                                                            }

                                                        </td>

                                                        <td className="p-4 text-right text-slate-400">

                                                            {
                                                                investment.transactions
                                                            }

                                                        </td>

                                                    </tr>

                                                )
                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        )
                }

            </div>

        </div>

    );

};

export default InvestmentAnalytics;