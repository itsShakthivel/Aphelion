import { useSelector } from "react-redux";

const FamilyDebtAnalysis = () => {

    const {
        debtAnalysis,
    } = useSelector(
        state => state.familyAnalytics
    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Debt Analysis

            </h2>

            {debtAnalysis.length === 0 ? (

                <div className="py-10 text-center text-gray-500">

                    No household debt available.

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="p-3 text-left">

                                    Loan

                                </th>

                                <th className="p-3 text-left">

                                    Type

                                </th>

                                <th className="p-3 text-right">

                                    Original

                                </th>

                                <th className="p-3 text-right">

                                    Remaining

                                </th>

                                <th className="p-3 text-left">

                                    Status

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {debtAnalysis.map(
                                loan => (

                                    <tr
                                        key={loan._id}
                                        className="border-b"
                                    >

                                        <td className="p-3">

                                            {loan.name}

                                        </td>

                                        <td className="p-3">

                                            {loan.loanType}

                                        </td>

                                        <td className="p-3 text-right">

                                            ₹ {

                                                Number(
                                                    loan.originalAmount
                                                ).toLocaleString()

                                            }

                                        </td>

                                        <td className="p-3 text-right">

                                            ₹ {

                                                Number(
                                                    loan.remainingAmount
                                                ).toLocaleString()

                                            }

                                        </td>

                                        <td className="p-3">

                                            {loan.status}

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );

};

export default FamilyDebtAnalysis;