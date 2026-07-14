import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const RenewalTimelineChart = ({
    insurances,
}) => {

    const data = insurances.map((insurance) => ({

        name: insurance.policyName,

        Premium: insurance.premium,

    }));

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Premium Overview

            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="Premium"
                            fill="#3B82F6"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default RenewalTimelineChart;