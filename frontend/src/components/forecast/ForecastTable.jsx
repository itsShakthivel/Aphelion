const ForecastTable = ({ forecast }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-x-auto">

            <table className="min-w-full">

                <thead>

                    <tr className="border-b">

                        <th className="p-4 text-left">

                            Month

                        </th>

                        <th className="p-4 text-right">

                            Income

                        </th>

                        <th className="p-4 text-right">

                            Expenses

                        </th>

                        <th className="p-4 text-right">

                            Savings

                        </th>

                        <th className="p-4 text-right">

                            Investments

                        </th>

                        <th className="p-4 text-right">

                            Net Worth

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        forecast.map((item) => (

                            <tr

                                key={item.index}

                                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"

                            >

                                <td className="p-4">

                                    {item.label}

                                </td>

                                <td className="p-4 text-right">

                                    ₹ {item.income.toLocaleString()}

                                </td>

                                <td className="p-4 text-right">

                                    ₹ {item.expenses.toLocaleString()}

                                </td>

                                <td className="p-4 text-right">

                                    ₹ {item.savings.toLocaleString()}

                                </td>

                                <td className="p-4 text-right">

                                    ₹ {item.investments.toLocaleString()}

                                </td>

                                <td className="p-4 text-right font-semibold">

                                    ₹ {item.netWorth.toLocaleString()}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ForecastTable;