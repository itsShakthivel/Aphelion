import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const LoanTable = ({
    loans,
    onEdit,
    onDelete,
}) => {

    if (loans.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-md p-8 text-center">

                <h2 className="text-xl font-semibold text-gray-600">

                    No Loans Found

                </h2>

                <p className="text-gray-500 mt-2">

                    Add your first loan.

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
                                Loan
                            </th>

                            <th className="text-left p-4">
                                Lender
                            </th>

                            <th className="text-right p-4">
                                Principal
                            </th>

                            <th className="text-right p-4">
                                Outstanding
                            </th>

                            <th className="text-right p-4">
                                EMI
                            </th>

                            <th className="text-center p-4">
                                Interest
                            </th>

                            <th className="text-center p-4">
                                End Date
                            </th>

                            <th className="text-center p-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loans.map((loan) => (

                            <tr
                                key={loan._id}
                                className="border-t hover:bg-slate-50"
                            >

                                <td className="p-4 font-medium">

                                    {loan.loanName}

                                </td>

                                <td className="p-4">

                                    {loan.lender}

                                </td>

                                <td className="p-4 text-right">

                                    ₹{loan.principalAmount.toLocaleString()}

                                </td>

                                <td className="p-4 text-right">

                                    ₹{loan.outstandingAmount.toLocaleString()}

                                </td>

                                <td className="p-4 text-right">

                                    ₹{loan.emi.toLocaleString()}

                                </td>

                                <td className="p-4 text-center">

                                    {loan.interestRate}%

                                </td>

                                <td className="p-4 text-center">

                                    {new Date(
                                        loan.endDate
                                    ).toLocaleDateString()}

                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-4">

                                        <button
                                            onClick={() =>
                                                onEdit(loan)
                                            }
                                            className="text-blue-600 hover:text-blue-800"
                                        >

                                            <FaEdit />

                                        </button>

                                        <button
                                            onClick={() =>
                                                onDelete(loan)
                                            }
                                            className="text-red-600 hover:text-red-800"
                                        >

                                            <FaTrash />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default LoanTable;