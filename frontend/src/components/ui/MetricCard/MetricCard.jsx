import Card from "../Card";
import AnimatedNumber from "../AnimatedNumber";
import TrendBadge from "../TrendBadge";

import { cn } from "../../../utils";
import { METRIC_TYPES } from "../../../constants";

const MetricCard = ({
    type,
    value = 0,
    trend,
    title,
    icon,
    accent,
    currency = "INR",
    locale = "en-IN",
    compact,
    decimals = 0,
    suffix,
    className = "",
    children,
}) => {
    const metric = METRIC_TYPES[type] || {};

    const Title = title ?? metric.title;

    const Icon = icon ?? metric.icon;

    const Accent = accent ?? metric.accent;

    const Compact = compact ?? metric.compact ?? false;

    const Suffix = suffix ?? metric.suffix ?? "";

    return (
        <Card
            accent={Accent}
            className={cn("h-full", className)}
        >
            <div className="flex items-start justify-between">

                <div className="flex-1">

                    <p className="text-sm text-slate-500 dark:text-slate-400">

                        {Title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        <AnimatedNumber
                            value={value}
                            currency={currency}
                            locale={locale}
                            compact={Compact}
                            decimals={decimals}
                            suffix={Suffix}
                        />

                    </h2>

                </div>

                {Icon && (

                    <div className="icon-box">

                        <Icon size={22} />

                    </div>

                )}

            </div>

            {trend !== undefined && (

                <div className="mt-5">

                    <TrendBadge value={trend} />

                </div>

            )}

            {children}

        </Card>
    );
};

export default MetricCard;