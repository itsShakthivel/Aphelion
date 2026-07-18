import Card from "../Card";

import { cn } from "../../../utils";

const ChartCard = ({
    title,
    subtitle,
    action,
    accent = "primary",
    height = "350px",
    className = "",
    children,
}) => {

    return (

        <Card
            accent={accent}
            className={cn("h-full", className)}
        >

            <div className="mb-6 flex items-start justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">

                        {title}

                    </h3>

                    {subtitle && (

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                            {subtitle}

                        </p>

                    )}

                </div>

                {action && (

                    <div>

                        {action}

                    </div>

                )}

            </div>

            <div
                style={{
                    height,
                }}
            >

                {children}

            </div>

        </Card>

    );

};

export default ChartCard;