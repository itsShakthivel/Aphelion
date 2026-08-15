import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ReferenceLine,
} from "recharts";

import FireTimelineTooltip from "./FireTimelineTooltip";

import { formatCurrency } from "../../utils/formatCurrency";


const FireTimeline = ({ timeline }) => {

    if (!timeline?.length) {
        return null;
    }


    return (

        <section className="
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/60
            p-8
            shadow-xl
        ">


            {/* ==========================================
                Header
            ========================================== */}

            <h2 className="
                mb-6
                text-2xl
                font-bold
                text-white
            ">

                FIRE Timeline

            </h2>


            {/* ==========================================
                Chart
            ========================================== */}

            <div className="h-96">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={timeline}
                    >

                        <CartesianGrid
                            stroke="#27272a"
                            vertical={false}
                        />


                        <XAxis

                            dataKey="age"

                            tick={{
                                fill: "#a1a1a1",
                            }}

                            axisLine={false}

                            tickLine={false}

                        />


                        <YAxis

                            tickFormatter={(value) =>
                                formatCurrency(value)
                            }

                            tick={{
                                fill: "#a1a1aa",
                            }}

                            axisLine={false}

                            tickLine={false}

                        />


                        <ReferenceLine

                            y={
                                timeline[0]?.target
                            }

                            stroke="#ef4444"

                            strokeDasharray="5 5"

                            label="FIRE Target"

                        />


                        <Tooltip

                            content={
                                <FireTimelineTooltip />
                            }

                        />


                        <Line

                            type="monotone"

                            dataKey="wealth"

                            stroke="#f97316"

                            strokeWidth={3}

                            dot={({
                                cx,
                                cy,
                                payload,
                            }) => {

                                if (
                                    !payload?.achieved
                                ) {

                                    return null;

                                }


                                return (

                                    <circle

                                        cx={cx}

                                        cy={cy}

                                        r={7}

                                        fill="#22c55e"

                                        stroke="#ffffff"

                                        strokeWidth={2}

                                    />

                                );

                            }}

                            animationDuration={1200}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </section>

    );

};


export default FireTimeline;