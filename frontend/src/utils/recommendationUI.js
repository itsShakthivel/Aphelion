import {
    FaShieldHalved,
    FaPiggyBank,
    FaWallet,
    FaBullseye,
} from "react-icons/fa6";

import {
    TrendingUp,
    CreditCard,
    Flame,
} from "lucide-react";

export const recommendationIcons = {

    Savings: FaPiggyBank,

    Investment: TrendingUp,

    Debt: CreditCard,

    Insurance: FaShieldHalved,

    Expenses: FaWallet,

    Goals: FaBullseye,

    FIRE: Flame,

};

export const priorityStyles = {

    Critical: {

        badge: "bg-red-500",

        text: "text-red-500",

        border: "border-red-500",

    },

    High: {

        badge: "bg-orange-500",

        text: "text-orange-500",

        border: "border-orange-500",

    },

    Medium: {

        badge: "bg-yellow-500",

        text: "text-yellow-500",

        border: "border-yellow-500",

    },

    Low: {

        badge: "bg-blue-500",

        text: "text-blue-500",

        border: "border-blue-500",

    },

    Positive: {

        badge: "bg-green-500",

        text: "text-green-500",

        border: "border-green-500",

    },

};