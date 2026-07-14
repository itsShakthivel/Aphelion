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

const InvestmentGrowthChart = ({
    investments,
}) => {

    const data = investments.map((investment) => ({

        name: investment.name,

        Invested: investment.investedAmount,

        Current: investment.currentValue,

    }));

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Investment Growth

            </h2>

            <div className="h-96">

                <ResponsiveContainer>

                    <BarChart
                        data={data}
                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="Invested"
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

export default InvestmentGrowthChart;