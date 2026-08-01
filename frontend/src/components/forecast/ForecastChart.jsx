import {

    ResponsiveContainer,

    LineChart,

    Line,

    CartesianGrid,

    XAxis,

    YAxis,

    Tooltip,

    Legend,

} from "recharts";

const ForecastChart = ({ forecast }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Net Worth Projection

            </h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <LineChart
                    data={forecast}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="label" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line

                        type="monotone"

                        dataKey="netWorth"

                        stroke="#2563eb"

                        strokeWidth={3}

                    />

                    <Line

                        type="monotone"

                        dataKey="investments"

                        stroke="#16a34a"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default ForecastChart;