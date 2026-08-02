import { useSelector } from "react-redux";

const FamilyInvestmentTable = () => {

    const { investments } = useSelector(
        state => state.familyInvestment
    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-4">

                                Investment

                            </th>

                            <th className="text-left p-4">

                                Type

                            </th>

                            <th className="text-left p-4">

                                Bucket

                            </th>

                            <th className="text-right p-4">

                                Invested

                            </th>

                            <th className="text-right p-4">

                                Current Value

                            </th>

                            <th className="text-left p-4">

                                Date

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            investments.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="6"

                                        className="text-center py-10"

                                    >

                                        No Investments Found

                                    </td>

                                </tr>

                            ) : (

                                investments.map(

                                    investment => (

                                        <tr

                                            key={investment._id}

                                            className="border-b"

                                        >

                                            <td className="p-4 font-medium">

                                                {

                                                    investment.investmentName

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    investment.investmentType

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    investment.bucket?.name ||

                                                    "Available"

                                                }

                                            </td>

                                            <td className="text-right p-4">

                                                ₹ {

                                                    investment.investedAmount.toLocaleString()

                                                }

                                            </td>

                                            <td className="text-right p-4">

                                                ₹ {

                                                    investment.currentValue.toLocaleString()

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    new Date(

                                                        investment.investmentDate

                                                    ).toLocaleDateString()

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

export default FamilyInvestmentTable;