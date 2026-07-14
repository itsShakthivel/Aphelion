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

const LoanAnalyticsChart = ({
    loans,
}) => {

    const data = loans.map((loan) => ({

        name: loan.loanName,

        Principal: loan.principalAmount,

        Outstanding: loan.outstandingAmount,

    }));

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Principal vs Outstanding

            </h2>

            <div className="h-80">

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
                            dataKey="Principal"
                            fill="#3B82F6"
                        />

                        <Bar
                            dataKey="Outstanding"
                            fill="#10B981"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default LoanAnalyticsChart;