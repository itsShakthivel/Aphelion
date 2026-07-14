const LoanSummaryCards = ({ loans }) => {

    const totalBorrowed = loans.reduce(

        (sum, loan) =>

            sum + loan.principalAmount,

        0

    );

    const outstanding = loans.reduce(

        (sum, loan) =>

            sum + loan.outstandingAmount,

        0

    );

    const totalEmi = loans.reduce(

        (sum, loan) =>

            sum + loan.emi,

        0

    );

    const averageInterest = loans.length

        ? loans.reduce(

            (sum, loan) =>

                sum + loan.interestRate,

            0

        ) / loans.length

        : 0;

    const cards = [

        {

            title: "Total Borrowed",

            value: `₹${totalBorrowed.toLocaleString()}`,

            color: "bg-blue-500",

            icon: "💰",

        },

        {

            title: "Outstanding",

            value: `₹${outstanding.toLocaleString()}`,

            color: "bg-red-500",

            icon: "🏦",

        },

        {

            title: "Monthly EMI",

            value: `₹${totalEmi.toLocaleString()}`,

            color: "bg-emerald-500",

            icon: "📅",

        },

        {

            title: "Avg Interest",

            value: `${averageInterest.toFixed(2)}%`,

            color: "bg-purple-500",

            icon: "📉",

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

export default LoanSummaryCards;