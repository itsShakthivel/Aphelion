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
];

const PortfolioAllocationChart = ({
    investments,
}) => {

    const allocation = {};

    investments.forEach((investment) => {

        allocation[investment.type] =
            (allocation[investment.type] || 0) +
            investment.currentValue;

    });

    const data = Object.entries(allocation).map(
        ([type, value]) => ({
            name: type.replace("_", " "),
            value,
        })
    );

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Portfolio Allocation

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index % COLORS.length
                                        ]
                                    }
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default PortfolioAllocationChart;