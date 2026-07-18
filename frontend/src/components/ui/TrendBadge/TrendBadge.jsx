import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaMinus,
} from "react-icons/fa6";

import { cn } from "../../../utils";
import { STATUS_COLORS } from "../../../constants";

const TREND_MAP = {
    positive: "success",
    negative: "danger",
    neutral: "neutral",
};

const ICONS = {
    positive: FaArrowTrendUp,
    negative: FaArrowTrendDown,
    neutral: FaMinus,
};

const SIGNS = {
    positive: "+",
    negative: "-",
    neutral: "",
};

const TrendBadge = ({
    value = 0,
    status,
    suffix = "%",
    showIcon = true,
    showSign = true,
    className = "",
}) => {
    const trend =
        status ??
        (value > 0
            ? "positive"
            : value < 0
            ? "negative"
            : "neutral");

    const colors = STATUS_COLORS[TREND_MAP[trend]];
    const Icon = ICONS[trend];

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition-default",
                colors.bg,
                colors.text,
                colors.border,
                className
            )}
        >
            {showIcon && <Icon className="text-[10px]" />}

            <span>
                {showSign && SIGNS[trend]}
                {Math.abs(value)}
                {suffix}
            </span>
        </span>
    );
};

export default TrendBadge;