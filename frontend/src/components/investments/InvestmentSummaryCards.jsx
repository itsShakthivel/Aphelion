const InvestmentSummaryCards = ({ investments }) => {

    const totalInvested = investments.reduce(

        (total, investment) =>

            total + investment.investedAmount,

        0

    );

    const currentValue = investments.reduce(

        (total, investment) =>

            total + investment.currentValue,

        0

    );

    const profitLoss = currentValue - totalInvested;

    const roi =

        totalInvested === 0

            ? 0

            : ((profitLoss / totalInvested) * 100);

    const cards = [

        {
            title: "Total Invested",
            value: `₹${totalInvested.toLocaleString()}`,
            color: "bg-blue-500",
            icon: "💰",
        },

        {
            title: "Current Value",
            value: `₹${currentValue.toLocaleString()}`,
            color: "bg-emerald-500",
            icon: "📈",
        },

        {
            title: "Profit / Loss",
            value: `₹${profitLoss.toLocaleString()}`,
            color:
                profitLoss >= 0
                    ? "bg-green-500"
                    : "bg-red-500",
            icon:
                profitLoss >= 0
                    ? "🟢"
                    : "🔴",
        },

        {
            title: "ROI",
            value: `${roi.toFixed(2)}%`,
            color: "bg-purple-500",
            icon: "📊",
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

                            <p className="text-gray-500">

                                {card.title}

                            </p>

                            <h2 className="text-2xl font-bold mt-2">

                                {card.value}

                            </h2>

                        </div>

                        <div
                            className={`${card.color} text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}
                        >

                            {card.icon}

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

};

export default InvestmentSummaryCards;