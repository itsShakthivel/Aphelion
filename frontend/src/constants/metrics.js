import {
    FaWallet,
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaBullseye,
    FaShield,
    FaChartPie,
    FaChartLine,
    FaCoins,
    FaPiggyBank,
} from "./icons";

export const METRIC_TYPES = {
    netWorth: {
        title: "Net Worth",
        accent: "primary",
        icon: FaWallet,
        compact: true,
    },

    income: {
        title: "Income",
        accent: "success",
        icon: FaArrowTrendUp,
        compact: true,
    },

    expenses: {
        title: "Expenses",
        accent: "danger",
        icon: FaArrowTrendDown,
        compact: true,
    },

    investments: {
        title: "Investments",
        accent: "info",
        icon: FaChartLine,
        compact: true,
    },

    savings: {
        title: "Savings",
        accent: "warning",
        icon: FaPiggyBank,
        compact: true,
    },

    insurance: {
        title: "Insurance",
        accent: "primary",
        icon: FaShield,
        compact: true,
    },

    goals: {
        title: "Goals",
        accent: "success",
        icon: FaBullseye,
        compact: false,
    },

    assets: {
        title: "Assets",
        accent: "warning",
        icon: FaCoins,
        compact: true,
    },

    portfolio: {
        title: "Portfolio",
        accent: "info",
        icon: FaChartPie,
        compact: false,
        suffix: "%",
    },
};