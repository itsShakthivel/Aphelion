import { useSelector } from "react-redux";

const ContributionTable = () => {

    const {

        contributions,

    } = useSelector(
        (state) => state.contribution
    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-5">

                Contributions

            </h2>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr>

                            <th className="text-left py-2">

                                Contributor

                            </th>

                            <th className="text-left py-2">

                                Bucket

                            </th>

                            <th className="text-left py-2">

                                Amount

                            </th>

                            <th className="text-left py-2">

                                Date

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            contributions.map(
                                (item) => (

                                    <tr
                                        key={item._id}
                                    >

                                        <td className="py-3">

                                            {

                                                item.contributor?.name ||

                                                item.managedMember?.name ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {

                                                item.bucket?.name ||

                                                "Available"

                                            }

                                        </td>

                                        <td>

                                            ₹ {item.amount.toLocaleString()}

                                        </td>

                                        <td>

                                            {

                                                new Date(
                                                    item.contributedAt
                                                ).toLocaleDateString()

                                            }

                                        </td>

                                    </tr>

                                )
                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default ContributionTable;