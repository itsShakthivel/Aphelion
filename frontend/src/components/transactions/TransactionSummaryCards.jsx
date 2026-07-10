import { FaArrowTrendUp, FaArrowTrendDown, FaWallet, FaPiggyBank } from "react-icons/fa6";

const TransactionSummaryCards = ({ transactions }) => {

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const savings = income - expense;

    const balance = savings;

    const cards = [
        {
            title: "Income",
            value: income,
            icon: <FaArrowTrendUp />,
            color: "text-green-500",
            bg: "bg-green-50",
        },
        {
            title: "Expense",
            value: expense,
            icon: <FaArrowTrendDown />,
            color: "text-red-500",
            bg: "bg-red-50",
        },
        {
            title: "Savings",
            value: savings,
            icon: <FaPiggyBank />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            title: "Balance",
            value: balance,
            icon: <FaWallet />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white rounded-xl shadow-md p-6"
                >
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500 text-sm">
                                {card.title}
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ₹ {card.value.toLocaleString()}
                            </h2>

                        </div>

                        <div
                            className={`text-3xl p-3 rounded-full ${card.bg} ${card.color}`}
                        >
                            {card.icon}
                        </div>

                    </div>
                </div>

            ))}

        </div>
    );
};

export default TransactionSummaryCards;