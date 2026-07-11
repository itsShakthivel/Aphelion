const CategorySummaryCards = ({ categories }) => {

    const expenseCount = categories.filter(
        (category) => category.type === "expense"
    ).length;

    const incomeCount = categories.filter(
        (category) => category.type === "income"
    ).length;

    const investmentCount = categories.filter(
        (category) => category.type === "investment"
    ).length;

    const savingCount = categories.filter(
        (category) => category.type === "saving"
    ).length;

    const cards = [

        {
            title: "Expense",
            value: expenseCount,
            color: "bg-red-500",
            emoji: "💸",
        },

        {
            title: "Income",
            value: incomeCount,
            color: "bg-green-500",
            emoji: "💼",
        },

        {
            title: "Investment",
            value: investmentCount,
            color: "bg-blue-500",
            emoji: "📈",
        },

        {
            title: "Saving",
            value: savingCount,
            color: "bg-yellow-500",
            emoji: "🏦",
        },

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white rounded-xl shadow-md p-6"
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-500">
                                {card.title}
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {card.value}
                            </h2>

                        </div>

                        <div
                            className={`${card.color} text-white text-2xl w-14 h-14 rounded-xl flex items-center justify-center`}
                        >
                            {card.emoji}
                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default CategorySummaryCards;