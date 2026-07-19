import {

    ResponsiveContainer,

    LineChart,

    Line,

    CartesianGrid,

    Tooltip,

    XAxis,

    YAxis,

} from "recharts";

const FireTimeline = ({ timeline }) => {

    if (!timeline?.length) return null;

    return (

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">

                FIRE Timeline

            </h2>

            <div className="h-96">

                <ResponsiveContainer>

                    <LineChart

                        data={timeline}

                    >

                        <CartesianGrid stroke="#27272a" />

                        <XAxis dataKey="year" />

                        <YAxis />

                        <Tooltip />

                        <Line

                            type="monotone"

                            dataKey="wealth"

                            stroke="#f97316"

                            strokeWidth={3}

                            dot={false}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </section>

    );

};

export default FireTimeline;