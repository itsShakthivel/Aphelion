export const createRecommendation = ({

    category,

    priority,

    title,

    description,

    impact,

    action,

    estimatedSavings = 0,

}) => {

    const iconMap = {

        Savings: "PiggyBank",

        Investment: "TrendingUp",

        Debt: "CreditCard",

        Insurance: "Shield",

        Expenses: "Wallet",

        Goals: "Target",

        FIRE: "Flame",

        Income: "BadgeIndianRupee",

    };

    const colorMap = {

        Critical: "red",

        High: "orange",

        Medium: "yellow",

        Low: "blue",

        Positive: "green",

    };

    const scoreMap = {

        Critical: 100,

        High: 80,

        Medium: 60,

        Low: 40,

        Positive: 20,

    };

    return {

        id: crypto.randomUUID(),

        category,

        priority,

        title,

        description,

        impact,

        action,

        estimatedSavings,

        icon: iconMap[category] || "Bot",

        color: colorMap[priority] || "gray",

        score: scoreMap[priority] || 0,

    };

};