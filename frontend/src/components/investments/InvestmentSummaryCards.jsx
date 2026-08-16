import {
    FaWallet,
    FaChartLine,
    FaArrowTrendUp,
} from "react-icons/fa6";


const InvestmentSummaryCards = ({
    investments,
}) => {

    // ======================================================
    // TOTAL INVESTED
    // ======================================================

    const totalInvested =
        investments.reduce(

            (
                total,
                investment
            ) => {

                return (
                    total +
                    (
                        Number(
                            investment.investedAmount
                        ) || 0
                    )
                );

            },

            0

        );


    // ======================================================
    // CURRENT VALUE
    // ======================================================

    const currentValue =
        investments.reduce(

            (
                total,
                investment
            ) => {

                return (
                    total +
                    (
                        Number(
                            investment.currentValue
                        ) || 0
                    )
                );

            },

            0

        );


    // ======================================================
    // PROFIT / LOSS
    // ======================================================

    const profitLoss =
        currentValue -
        totalInvested;


    // ======================================================
    // ROI
    // ======================================================

    const roi =
        totalInvested === 0

            ? 0

            : (
                (
                    profitLoss /
                    totalInvested
                ) * 100
            );


    // ======================================================
    // FORMAT CURRENCY
    // ======================================================

    const formatCurrency = (
        value
    ) => {

        return `₹${value.toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 2,
            }
        )}`;

    };


    // ======================================================
    // CARDS
    // ======================================================

    const cards = [

        {
            title:
                "Total Invested",

            value:
                formatCurrency(
                    totalInvested
                ),

            icon:
                <FaWallet />,

            iconClass:
                "bg-blue-500/10 text-blue-600",

        },

        {
            title:
                "Current Value",

            value:
                formatCurrency(
                    currentValue
                ),

            icon:
                <FaChartLine />,

            iconClass:
                "bg-emerald-500/10 text-emerald-600",

        },

        {
            title:
                "Profit / Loss",

            value:
                `${profitLoss >= 0 ? "+" : ""}${formatCurrency(
                    profitLoss
                )}`,

            icon:
                <FaArrowTrendUp />,

            iconClass:
                profitLoss >= 0

                    ? "bg-emerald-500/10 text-emerald-600"

                    : "bg-red-500/10 text-red-600",

            valueClass:
                profitLoss >= 0

                    ? "text-emerald-600"

                    : "text-red-600",

        },

        {
            title:
                "ROI",

            value:
                `${roi >= 0 ? "+" : ""}${roi.toFixed(2)}%`,

            icon:
                <FaChartLine />,

            iconClass:
                roi >= 0

                    ? "bg-purple-500/10 text-purple-600"

                    : "bg-red-500/10 text-red-600",

            valueClass:
                roi >= 0

                    ? "text-purple-600"

                    : "text-red-600",

        },

    ];


    // ======================================================
    // UI
    // ======================================================

    return (

        <div
            className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {cards.map(
                (card) => (

                    <div
                        key={
                            card.title
                        }
                        className="
                            rounded-2xl
                            border
                            border-white/50
                            bg-white/60
                            p-5
                            shadow-sm
                            backdrop-blur-xl
                            transition
                            duration-200
                            hover:-translate-y-0.5
                            hover:bg-white/70
                            hover:shadow-md
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-4
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                    "
                                >
                                    {card.title}
                                </p>


                                <h2
                                    className={`
                                        mt-2
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        ${
                                            card.valueClass ||
                                            "text-slate-800"
                                        }
                                    `}
                                >
                                    {card.value}
                                </h2>

                            </div>


                            <div
                                className={`
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-lg
                                    ${card.iconClass}
                                `}
                            >

                                {card.icon}

                            </div>

                        </div>

                    </div>

                )

            )}

        </div>

    );

};


export default InvestmentSummaryCards;