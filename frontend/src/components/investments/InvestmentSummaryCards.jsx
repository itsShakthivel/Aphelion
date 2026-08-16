import {
    FaWallet,
    FaChartLine,
    FaArrowTrendUp,
} from "react-icons/fa6";


const InvestmentSummaryCards = ({
    investments = [],
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
        totalInvested > 0

            ? (
                profitLoss /
                totalInvested
            ) * 100

            : 0;


    // ======================================================
    // FORMAT CURRENCY
    // ======================================================

    const formatCurrency = (
        value
    ) => {

        return `₹${(
            Number(value) || 0
        ).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0,
            }
        )}`;

    };


    // ======================================================
    // CARD DATA
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
                "bg-blue-50 text-blue-600",

            valueClass:
                "text-white",

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
                "bg-emerald-50 text-emerald-600",

            valueClass:
                "text-white",

        },

        {
            title:
                "Profit / Loss",

            value:
                `${profitLoss >= 0 ? "+" : "-"}${formatCurrency(
                    Math.abs(
                        profitLoss
                    )
                )}`,

            icon:
                <FaArrowTrendUp />,

            iconClass:
                profitLoss >= 0

                    ? "bg-emerald-50 text-emerald-600"

                    : "bg-red-50 text-red-600",

            valueClass:
                profitLoss >= 0

                    ? "text-emerald-400"

                    : "text-red-400",

        },

        {
            title:
                "ROI",

            value:
                `${roi >= 0 ? "+" : ""}${roi.toFixed(2)}%`,

            icon:
                <FaChartLine />,

            iconClass:
                "bg-purple-50 text-purple-600",

            valueClass:
                roi >= 0

                    ? "text-purple-400"

                    : "text-red-400",

        },

    ];


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
                            border-white/[0.04]
                            bg-[#0b1428]
                            p-5
                            shadow-lg
                            shadow-black/10
                            transition
                            duration-200
                            hover:-translate-y-0.5
                            hover:bg-[#0d1830]
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-xs
                                        font-medium
                                        text-slate-400
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
                                            card.valueClass
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
                                    rounded-full
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