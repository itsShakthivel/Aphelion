import { useSelector } from "react-redux";

import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaPiggyBank,
    FaChartLine,
} from "react-icons/fa6";

import SummaryCard from "../../ui/SummaryCard";

const AnalyticsSummaryCards = () => {

    const { overview } = useSelector(
        (state) => state.analytics
    );

    const cards = [

        {
            title: "Income",
            value: `₹ ${Number(
                overview?.income || 0
            ).toLocaleString("en-IN")}`,
            icon: <FaArrowTrendUp />,
            color: "green",
        },

        {
            title: "Expenses",
            value: `₹ ${Number(
                overview?.expenses || 0
            ).toLocaleString("en-IN")}`,
            icon: <FaArrowTrendDown />,
            color: "red",
        },

        {
            title: "Savings",
            value: `₹ ${Number(
                overview?.savings || 0
            ).toLocaleString("en-IN")}`,
            icon: <FaPiggyBank />,
            color: "blue",
        },

        {
            title: "Investments",
            value: `₹ ${Number(
                overview?.investments?.currentValue || 0
            ).toLocaleString("en-IN")}`,
            icon: <FaChartLine />,
            color: "purple",
        },

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

                <SummaryCard

                    key={card.title}

                    {...card}

                />

            ))}

        </div>

    );

};

export default AnalyticsSummaryCards;