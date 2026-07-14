const GoalSummaryCards = ({ goals }) => {

    const totalGoals = goals.length;

    const totalTarget = goals.reduce(

        (sum, goal) =>

            sum + goal.targetAmount,

        0

    );

    const totalSaved = goals.reduce(

        (sum, goal) =>

            sum + goal.currentAmount,

        0

    );

    const progress = totalTarget

        ? (totalSaved / totalTarget) * 100

        : 0;

    const cards = [

        {

            title: "Goals",

            value: totalGoals,

            color: "bg-blue-500",

            icon: "🎯",

        },

        {

            title: "Target",

            value: `₹${totalTarget.toLocaleString()}`,

            color: "bg-purple-500",

            icon: "💰",

        },

        {

            title: "Saved",

            value: `₹${totalSaved.toLocaleString()}`,

            color: "bg-emerald-500",

            icon: "💵",

        },

        {

            title: "Overall Progress",

            value: `${progress.toFixed(1)}%`,

            color: "bg-orange-500",

            icon: "📈",

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

export default GoalSummaryCards;