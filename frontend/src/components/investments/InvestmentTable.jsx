import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const InvestmentTable = ({
    investments,
    onEdit,
    onDelete,
}) => {

    if (investments.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-md p-8 text-center">

                <h2 className="text-xl font-semibold text-gray-600">

                    No Investments Found

                </h2>

                <p className="text-gray-500 mt-2">

                    Add your first investment to build your portfolio.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="text-left p-4">
                                Name
                            </th>

                            <th className="text-left p-4">
                                Type
                            </th>

                            <th className="text-right p-4">
                                Invested
                            </th>

                            <th className="text-right p-4">
                                Current
                            </th>

                            <th className="text-right p-4">
                                Profit / Loss
                            </th>

                            <th className="text-right p-4">
                                ROI
                            </th>

                            <th className="text-center p-4">
                                Purchase Date
                            </th>

                            <th className="text-center p-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {investments.map((investment) => {

                            const profit =

                                investment.currentValue -

                                investment.investedAmount;

                            const roi =

                                investment.investedAmount === 0

                                    ? 0

                                    : (

                                        (profit /

                                            investment.investedAmount) *

                                        100

                                    );

                            return (

                                <tr
                                    key={investment._id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4 font-medium">

                                        {investment.name}

                                    </td>

                                    <td className="p-4 capitalize">

                                        {investment.type.replace("_", " ")}

                                    </td>

                                    <td className="p-4 text-right">

                                        ₹{investment.investedAmount.toLocaleString()}

                                    </td>

                                    <td className="p-4 text-right">

                                        ₹{investment.currentValue.toLocaleString()}

                                    </td>

                                    <td
                                        className={`p-4 text-right font-semibold ${
                                            profit >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >

                                        ₹{profit.toLocaleString()}

                                    </td>

                                    <td
                                        className={`p-4 text-right font-semibold ${
                                            roi >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >

                                        {roi.toFixed(2)}%

                                    </td>

                                    <td className="p-4 text-center">

                                        {new Date(
                                            investment.purchaseDate
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-4">

                                            <button
                                                onClick={() =>
                                                    onEdit(investment)
                                                }
                                                className="text-blue-600 hover:text-blue-800"
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(investment)
                                                }
                                                className="text-red-600 hover:text-red-800"
                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default InvestmentTable;