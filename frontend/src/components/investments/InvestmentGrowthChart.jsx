import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";


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


const InvestmentGrowthChart = ({
    investments = [],
}) => {

    const data =
        investments.map(
            (
                investment
            ) => ({

                name:
                    investment.name,

                Invested:
                    Number(
                        investment.investedAmount
                    ) || 0,

                Current:
                    Number(
                        investment.currentValue
                    ) || 0,

            })
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
                "
            >

                <h2
                    className="
                        text-base
                        font-semibold
                        text-white
                    "
                >
                    Investment Growth
                </h2>

                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-500
                    "
                >
                    Invested amount versus current value.
                </p>

            </div>


            {/* ==================================================
                EMPTY
            ================================================== */}

            {data.length === 0 ? (

                <div
                    className="
                        flex
                        h-80
                        items-center
                        justify-center
                        text-sm
                        text-slate-500
                    "
                >
                    No investment data available.
                </div>

            ) : (

                <div
                    className="
                        h-80
                        w-full
                    "
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={
                                data
                            }
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 10,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="rgba(148,163,184,0.08)"
                            />


                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill:
                                        "#64748b",
                                    fontSize:
                                        10,
                                }}
                                axisLine={{
                                    stroke:
                                        "rgba(148,163,184,0.08)",
                                }}
                                tickLine={false}
                                tickFormatter={(
                                    value
                                ) =>
                                    value.length >
                                    14

                                        ? `${value.slice(
                                            0,
                                            14
                                        )}...`

                                        : value
                                }
                            />


                            <YAxis
                                tick={{
                                    fill:
                                        "#64748b",
                                    fontSize:
                                        10,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(
                                    value
                                ) =>
                                    `₹${(
                                        value /
                                        1000
                                    ).toFixed(
                                        0
                                    )}k`
                                }
                            />


                            <Tooltip
                                contentStyle={{
                                    background:
                                        "#101b31",

                                    border:
                                        "1px solid rgba(255,255,255,0.08)",

                                    borderRadius:
                                        "12px",

                                    color:
                                        "#ffffff",

                                    boxShadow:
                                        "0 20px 40px rgba(0,0,0,0.35)",
                                }}
                                labelStyle={{
                                    color:
                                        "#ffffff",
                                    marginBottom:
                                        "6px",
                                }}
                                formatter={(
                                    value,
                                    name
                                ) => [

                                    formatCurrency(
                                        value
                                    ),

                                    name,

                                ]}
                            />


                            <Legend
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


                            <Bar
                                dataKey="Invested"
                                fill="#3B82F6"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0,
                                ]}
                                maxBarSize={28}
                            />


                            <Bar
                                dataKey="Current"
                                fill="#10B981"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0,
                                ]}
                                maxBarSize={28}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>

    );

};


export default InvestmentGrowthChart;