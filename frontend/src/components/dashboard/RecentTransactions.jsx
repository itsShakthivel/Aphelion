import {
    FaArrowTrendUp,
    FaArrowTrendDown,
} from "../../constants";

import ChartCard from "../ui/ChartCard";
import EmptyState from "../ui/EmptyState";
import { formatNumber } from "../../utils";

function RecentTransactions({
    data,
    currency = "INR",
    locale = "en-IN",
}) {

    if (!data) return null;

    const transactions = data.recentTransactions || [];

    return (

        <ChartCard
            title="Recent Transactions"
            subtitle="Latest activity across your accounts"
            accent="primary"
        >

            {transactions.length === 0 ? (

                <EmptyState
                    icon="💸"
                    title="No Transactions"
                    message="Add your first transaction to start tracking your finances."
                />

            ) : (

                <div className="space-y-4">

                    {transactions.map((transaction) => (

                        <div
                            key={transaction._id}
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-slate-800/60
                                pb-4
                                last:border-0
                            "
                        >

                            <div className="flex items-center gap-4">

                                <div
                                    className={`
                                        w-10
                                        h-10
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        ${
                                            transaction.type === "income"
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-rose-500/10 text-rose-400"
                                        }
                                    `}
                                >

                                    {transaction.type === "income" ? (
                                        <FaArrowTrendUp />
                                    ) : (
                                        <FaArrowTrendDown />
                                    )}

                                </div>

                                <div>

                                    <h3 className="text-white font-medium">

                                        {transaction.description}

                                    </h3>

                                    <p className="text-sm text-slate-400">

                                        {transaction.category?.name || "Uncategorized"}

                                    </p>

                                    {transaction.date && (

                                        <p className="text-xs text-slate-500 mt-1">

                                            {new Date(
                                                transaction.date
                                            ).toLocaleDateString(locale)}

                                        </p>

                                    )}

                                </div>

                            </div>

                            <span
                                className={
                                    transaction.type === "income"
                                        ? "text-emerald-400 font-semibold"
                                        : "text-rose-400 font-semibold"
                                }
                            >

                                {formatNumber(transaction.amount, {
                                    currency:
                                        transaction.currency || currency,
                                    locale,
                                })}

                            </span>

                        </div>

                    ))}

                </div>

            )}

        </ChartCard>

    );

}

export default RecentTransactions;