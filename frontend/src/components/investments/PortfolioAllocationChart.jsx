import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";


const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#64748B",
];


const formatType = (
    type
) => {

    const labels = {

        stock:
            "Stocks",

        mutual_fund:
            "Mutual Funds",

        etf:
            "ETFs",

        gold:
            "Gold",

        crypto:
            "Crypto",

        fd:
            "Fixed Deposits",

        real_estate:
            "Real Estate",

        bond:
            "Bonds",

        other:
            "Other",

    };


    return (
        labels[type] ||
        "Other"
    );

};


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


const CustomTooltip = ({
    active,
    payload,
}) => {

    if (
        !active ||
        !payload ||
        !payload.length
    ) {

        return null;

    }


    const item =
        payload[0].payload;


    return (

        <div
            className="
                rounded-xl
                border
                border-white/10
                bg-[#101b31]
                px-4
                py-3
                shadow-2xl
            "
        >

            <p
                className="
                    text-sm
                    font-semibold
                    text-white
                "
            >
                {item.name}
            </p>

            <p
                className="
                    mt-1
                    text-sm
                    text-slate-300
                "
            >
                {formatCurrency(
                    item.value
                )}
            </p>

            <p
                className="
                    mt-1
                    text-xs
                    font-medium
                    text-blue-400
                "
            >
                {item.percentage.toFixed(
                    2
                )}
                %
            </p>

        </div>

    );

};


const PortfolioAllocationChart = ({
    investments = [],
}) => {

    const allocation = {};


    investments.forEach(
        (investment) => {

            const type =
                investment.type ||
                "other";


            const value =
                Number(
                    investment.currentValue
                ) || 0;


            allocation[type] =
                (
                    allocation[type] ||
                    0
                ) +
                value;

        }
    );


    const totalValue =
        Object.values(
            allocation
        )
        .reduce(
            (
                total,
                value
            ) =>
                total + value,
            0
        );


    const data =
        Object.entries(
            allocation
        )
        .map(
            (
                [
                    type,
                    value,
                ]
            ) => ({

                name:
                    formatType(
                        type
                    ),

                value,

                percentage:
                    totalValue > 0

                        ? (
                            value /
                            totalValue
                        ) * 100

                        : 0,

            })
        )
        .sort(
            (a, b) =>
                b.value -
                a.value
        );


    return (

        <div
            className="
                rounded-2xl
                border
                border-white/[0.04]
                bg-[#0b1428]
                p-5
                shadow-lg
                shadow-black/10
            "
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    mb-4
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >

                <div>

                    <h2
                        className="
                            text-base
                            font-semibold
                            text-white
                        "
                    >
                        Portfolio Allocation
                    </h2>

                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-500
                        "
                    >
                        Current portfolio distribution by asset type.
                    </p>

                </div>


                <span
                    className="
                        rounded-full
                        bg-blue-500/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-blue-400
                    "
                >
                    {formatCurrency(
                        totalValue
                    )}
                </span>

            </div>


            {/* ==================================================
                EMPTY
            ================================================== */}

            {data.length === 0 ? (

                <div
                    className="
                        flex
                        h-80
                        flex-col
                        items-center
                        justify-center
                        text-center
                    "
                >

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-500/10
                            text-xl
                            text-blue-400
                        "
                    >
                        ◔
                    </div>

                    <p
                        className="
                            mt-4
                            text-sm
                            font-medium
                            text-slate-400
                        "
                    >
                        No allocation data
                    </p>

                </div>

            ) : (

                <div
                    className="
                        h-80
                    "
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={
                                    data
                                }
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="48%"
                                outerRadius={105}
                                innerRadius={65}
                                paddingAngle={3}
                                stroke="#0b1428"
                                strokeWidth={3}
                            >

                                {data.map(
                                    (
                                        entry,
                                        index
                                    ) => (

                                        <Cell
                                            key={
                                                entry.name
                                            }
                                            fill={
                                                COLORS[
                                                    index %
                                                    COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>


                            <Tooltip
                                content={
                                    <CustomTooltip />
                                }
                            />


                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                formatter={(
                                    value
                                ) => (

                                    <span
                                        style={{
                                            color:
                                                "#94a3b8",
                                            fontSize:
                                                "12px",
                                        }}
                                    >
                                        {value}
                                    </span>

                                )}
                            />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>

    );

};


export default PortfolioAllocationChart;