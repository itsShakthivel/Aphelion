import { useSelector } from "react-redux";

const ExpenseBreakdown = () => {

    const { expenseAnalytics } = useSelector(
        (state) => state.analytics
    );

    const totalExpense = expenseAnalytics.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    if (!expenseAnalytics.length) {

        return (

            <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Expense Breakdown
                </h2>

                <div className="h-[350px] flex items-center justify-center text-gray-500">

                    No expense data available.

                </div>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-6">

                Expense Breakdown

            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">

                                Category

                            </th>

                            <th className="text-right py-3">

                                Amount

                            </th>

                            <th className="text-right py-3">

                                %

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {expenseAnalytics.map((item) => {

                            const percentage =
                                totalExpense === 0
                                    ? 0
                                    : (
                                        (item.amount / totalExpense) *
                                        100
                                    ).toFixed(1);

                            return (

                                <tr
                                    key={item.category}
                                    className="border-b last:border-none"
                                >

                                    <td className="py-4 font-medium">

                                        {item.category}

                                    </td>

                                    <td className="py-4 text-right">

                                        ₹{" "}

                                        {item.amount.toLocaleString(
                                            "en-IN"
                                        )}

                                    </td>

                                    <td className="py-4 text-right font-semibold text-blue-600">

                                        {percentage}%

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                    <tfoot>

                        <tr className="border-t font-bold">

                            <td className="pt-4">

                                Total

                            </td>

                            <td className="pt-4 text-right">

                                ₹{" "}

                                {totalExpense.toLocaleString("en-IN")}

                            </td>

                            <td></td>

                        </tr>

                    </tfoot>

                </table>

            </div>

        </div>

    );

};

export default ExpenseBreakdown;