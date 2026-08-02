import { useSelector } from "react-redux";

const FamilyLoanTable = () => {

    const { loans } = useSelector(
        state => state.familyLoan
    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                Loan

                            </th>

                            <th className="p-4 text-left">

                                Type

                            </th>

                            <th className="p-4 text-right">

                                Original

                            </th>

                            <th className="p-4 text-right">

                                Remaining

                            </th>

                            <th className="p-4 text-left">

                                Creditor

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loans.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="text-center py-10"

                                    >

                                        No Loans Found

                                    </td>

                                </tr>

                            ) : (

                                loans.map(

                                    loan => (

                                        <tr

                                            key={loan._id}

                                            className="border-b"

                                        >

                                            <td className="p-4">

                                                {loan.loanName}

                                            </td>

                                            <td className="p-4">

                                                {loan.loanType}

                                            </td>

                                            <td className="text-right p-4">

                                                ₹ {loan.originalAmount.toLocaleString()}

                                            </td>

                                            <td className="text-right p-4">

                                                ₹ {loan.remainingAmount.toLocaleString()}

                                            </td>

                                            <td className="p-4">

                                                {loan.creditor || "-"}

                                            </td>

                                        </tr>

                                    )

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default FamilyLoanTable;