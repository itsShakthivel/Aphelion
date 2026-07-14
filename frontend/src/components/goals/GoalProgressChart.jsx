import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

const GoalProgressChart = ({
    goals,
}) => {

    const data = goals.map((goal) => ({

        name: goal.title,

        Target: goal.targetAmount,

        Current: goal.currentAmount,

    }));

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Goal Progress

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <BarChart
                        data={data}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="name"
                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="Target"
                            fill="#3B82F6"
                        />

                        <Bar
                            dataKey="Current"
                            fill="#10B981"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default GoalProgressChart;