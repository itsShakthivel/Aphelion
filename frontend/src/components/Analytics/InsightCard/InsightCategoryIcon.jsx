import {
    FaPiggyBank,
    FaChartLine,
    FaCreditCard,
    FaWallet,
    FaBullseye,
} from "react-icons/fa";

import {
    FaFire,
} from "react-icons/fa6";

const ICONS = {

    savings: FaPiggyBank,

    investment: FaChartLine,

    debt: FaCreditCard,

    cashflow: FaWallet,

    goals: FaBullseye,

    fire: FaFire,

    networth: FaChartLine,

};

const InsightCategoryIcon = ({ category }) => {

    const Icon = ICONS[category] || FaChartLine;

    return (

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-lg text-white">
            <Icon />
        </div>

    );

};

export default InsightCategoryIcon;