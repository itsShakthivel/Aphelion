import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
];

const CoverageDistributionChart = ({
    insurances,
}) => {

    const grouped = {};

    insurances.forEach((insurance) => {

        grouped[insurance.type] =
            (grouped[insurance.type] || 0) +
            insurance.coverage;

    });

    const data = Object.entries(grouped).map(

        ([type, value]) => ({

            name: type,

            value,

        })

    );

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Coverage Distribution

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={110}
                            label
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[index % COLORS.length]
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

export default CoverageDistributionChart;