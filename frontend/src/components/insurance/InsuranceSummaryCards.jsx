const InsuranceSummaryCards = ({ insurances }) => {

    const totalPolicies = insurances.length;

    const totalPremium = insurances.reduce(

        (total, insurance) =>

            total + insurance.premium,

        0

    );

    const totalCoverage = insurances.reduce(

        (total, insurance) =>

            total + insurance.coverage,

        0

    );

    const expiringSoon = insurances.filter((insurance) => {

        const today = new Date();

        const expiry = new Date(insurance.expiryDate);

        const difference =

            (expiry - today) /

            (1000 * 60 * 60 * 24);

        return difference <= 30;

    }).length;

    const cards = [

        {
            title: "Policies",
            value: totalPolicies,
            color: "bg-blue-500",
            icon: "📄",
        },

        {
            title: "Total Premium",
            value: `₹${totalPremium.toLocaleString()}`,
            color: "bg-red-500",
            icon: "💳",
        },

        {
            title: "Coverage",
            value: `₹${totalCoverage.toLocaleString()}`,
            color: "bg-emerald-500",
            icon: "🛡️",
        },

        {
            title: "Expiring Soon",
            value: expiringSoon,
            color: "bg-yellow-500",
            icon: "⏳",
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

export default InsuranceSummaryCards;