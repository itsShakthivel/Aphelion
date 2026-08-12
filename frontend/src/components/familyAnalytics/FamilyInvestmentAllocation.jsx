import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

import { useSelector } from "react-redux";

const FamilyInvestmentAllocation = () => {

    const {
        investmentAllocation,
    } = useSelector(
        state => state.familyAnalytics
    );

    const data =
        investmentAllocation.map(item => ({

            name:
                item._id || "Other",

            value:
                item.total || 0,

        }));

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Investment Allocation

            </h2>

            {data.length === 0 ? (

                <div className="h-[300px] flex items-center justify-center text-gray-500">

                    No household investment data available.

                </div>

            ) : (

                <div className="h-[300px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >

                                {data.map(
                                    (
                                        entry,
                                        index
                                    ) => (

                                        <Cell
                                            key={`investment-${index}`}
                                        />

                                    )
                                )}

                            </Pie>

                            <Tooltip
                                formatter={value =>
                                    `₹ ${Number(value).toLocaleString()}`
                                }
                            />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>

    );

};

export default FamilyInvestmentAllocation;