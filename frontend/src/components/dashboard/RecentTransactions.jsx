import EmptyState from "../common/EmptyState";

function RecentTransactions({ data }) {

    if (!data) return null;

    const transactions = data.recentTransactions || [];

    return (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mt-6">

            <h2 className="text-xl font-bold text-white mb-5">

                Recent Transactions

            </h2>

            {transactions.length === 0 ? (

                <p className="text-slate-500">

                    <EmptyState
                        icon="💸"
                        title="No Transactions"
                        message="Add your first transaction to start tracking your finances."
                    />

                </p>

            ) : (

                <div className="space-y-4">

                    {transactions.map((transaction) => (

                        <div
                            key={transaction._id}
                            className="flex justify-between items-center border-b border-slate-800 pb-3"
                        >

                            <div>

                                <h3 className="text-white">

                                    {transaction.description}

                                </h3>

                                <p className="text-slate-500 text-sm">

                                    {transaction.category?.name || "Uncategorized"}

                                </p>

                            </div>

                            <div
                                className={
                                    transaction.type === "income"
                                        ? "text-emerald-400 font-semibold"
                                        : "text-rose-400 font-semibold"
                                }
                            >

                                ₹{transaction.amount.toLocaleString()}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default RecentTransactions;