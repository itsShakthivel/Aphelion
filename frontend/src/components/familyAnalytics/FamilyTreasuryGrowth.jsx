import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { useSelector } from "react-redux";

const FamilyTreasuryGrowth = () => {

    const {
        treasuryGrowth,
    } = useSelector(
        state => state.familyAnalytics
    );

    const data =
        treasuryGrowth.map(item => ({

            date:
                new Date(
                    item.date
                ).toLocaleDateString(),

            balance:
                item.balance || 0,

        }));

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Treasury Growth

            </h2>

            {data.length === 0 ? (

                <div className="h-[300px] flex items-center justify-center text-gray-500">

                    No treasury growth data available.

                </div>

            ) : (

                <div className="h-[300px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart data={data}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="date"
                            />

                            <YAxis />

                            <Tooltip
                                formatter={value =>
                                    `₹ ${Number(value).toLocaleString()}`
                                }
                            />

                            <Area
                                type="monotone"
                                dataKey="balance"
                                fillOpacity={0.25}
                                strokeWidth={2}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>

    );

};

export default FamilyTreasuryGrowth;