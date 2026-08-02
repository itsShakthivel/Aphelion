import { useSelector } from "react-redux";

const FamilyTransactionTable = () => {

    const {

        transactions,

    } = useSelector(

        state =>

            state.familyTransaction

    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-4">

                                Date

                            </th>

                            <th className="text-left p-4">

                                Category

                            </th>

                            <th className="text-left p-4">

                                Paid By

                            </th>

                            <th className="text-left p-4">

                                Bucket

                            </th>

                            <th className="text-left p-4">

                                Type

                            </th>

                            <th className="text-right p-4">

                                Amount

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            transactions.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="6"

                                        className="text-center py-10"

                                    >

                                        No Transactions Found

                                    </td>

                                </tr>

                            ) : (

                                transactions.map(

                                    transaction => (

                                        <tr

                                            key={transaction._id}

                                            className="border-b"

                                        >

                                            <td className="p-4">

                                                {

                                                    new Date(

                                                        transaction.transactionDate

                                                    ).toLocaleDateString()

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    transaction.category

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    transaction.paidBy?.name

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    transaction.bucket?.name ||

                                                    "Available"

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    transaction.type

                                                }

                                            </td>

                                            <td className="text-right p-4 font-semibold">

                                                ₹

                                                {

                                                    transaction.amount.toLocaleString()

                                                }

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

export default FamilyTransactionTable;