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
            <div className="bg-[#0f1b2d] border border-blue-900/40 rounded-xl shadow-md p-8 text-center">
                <h2 className="text-xl font-semibold text-white">
                    No Loans Found
                </h2>

                <p className="text-slate-400 mt-2">
                    Add your first loan.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#0f1b2d] border border-blue-900/40 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead className="bg-[#16243a]">

                        <tr>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Loan
                            </th>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Lender
                            </th>

                            <th className="text-right p-4 text-slate-300 font-medium">
                                Principal
                            </th>

                            <th className="text-right p-4 text-slate-300 font-medium">
                                Outstanding
                            </th>

                            <th className="text-right p-4 text-slate-300 font-medium">
                                EMI
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
                                Interest
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
                                End Date
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loans.map((loan) => (

                            <tr
                                key={loan._id}
                                className="border-t border-blue-900/30 bg-[#0f1b2d] hover:bg-[#172b46] transition-colors duration-200"
                            >

                                <td className="p-4 font-medium text-white">
                                    {loan.loanName}
                                </td>

                                <td className="p-4 text-slate-300">
                                    {loan.lender}
                                </td>

                                <td className="p-4 text-right text-slate-300">
                                    ₹{loan.principalAmount.toLocaleString()}
                                </td>

                                <td className="p-4 text-right text-slate-300">
                                    ₹{loan.outstandingAmount.toLocaleString()}
                                </td>

                                <td className="p-4 text-right text-slate-300">
                                    ₹{loan.emi.toLocaleString()}
                                </td>

                                <td className="p-4 text-center text-slate-300">
                                    {loan.interestRate}%
                                </td>

                                <td className="p-4 text-center text-slate-300">
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
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onDelete(loan)
                                            }
                                            className="text-red-400 hover:text-red-300 transition-colors"
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