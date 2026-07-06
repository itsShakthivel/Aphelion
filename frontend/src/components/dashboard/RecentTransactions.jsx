function RecentTransactions() {

    const transactions = [
        {
            title: "Salary",
            amount: "+₹80,000"
        },
        {
            title: "Rent",
            amount: "-₹15,000"
        },
        {
            title: "Groceries",
            amount: "-₹4,000"
        },
        {
            title: "SIP",
            amount: "-₹10,000"
        }
    ];

    return (
        <div
            className="
                bg-slate-900
                rounded-2xl
                p-6
                border
                border-slate-800
                mt-6
            "
        >

            <h2
                className="
                    text-white
                    text-xl
                    font-semibold
                    mb-4
                "
            >
                Recent Transactions
            </h2>

            {transactions.map((transaction) => (

                <div
                    key={transaction.title}
                    className="
                        flex
                        justify-between
                        py-4
                        border-b
                        border-slate-800
                    "
                >

                    <span className="text-white">
                        {transaction.title}
                    </span>

                    <span className="text-slate-300">
                        {transaction.amount}
                    </span>

                </div>

            ))}

        </div>
    );
}

export default RecentTransactions;