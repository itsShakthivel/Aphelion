import { useSelector } from "react-redux";

const FamilyInsuranceTable = () => {

    const { policies } = useSelector(
        state => state.familyInsurance
    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                Policy

                            </th>

                            <th className="p-4 text-left">

                                Provider

                            </th>

                            <th className="p-4 text-left">

                                Type

                            </th>

                            <th className="p-4 text-right">

                                Premium

                            </th>

                            <th className="p-4 text-right">

                                Coverage

                            </th>

                            <th className="p-4 text-left">

                                Renewal

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            policies.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center py-10"
                                    >

                                        No Insurance Policies Found

                                    </td>

                                </tr>

                            ) : (

                                policies.map(policy => (

                                    <tr
                                        key={policy._id}
                                        className="border-b"
                                    >

                                        <td className="p-4">

                                            {policy.policyName}

                                        </td>

                                        <td className="p-4">

                                            {policy.provider}

                                        </td>

                                        <td className="p-4">

                                            {policy.insuranceType}

                                        </td>

                                        <td className="text-right p-4">

                                            ₹ {policy.premiumAmount.toLocaleString()}

                                        </td>

                                        <td className="text-right p-4">

                                            ₹ {policy.coverageAmount.toLocaleString()}

                                        </td>

                                        <td className="p-4">

                                            {new Date(policy.renewalDate).toLocaleDateString()}

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default FamilyInsuranceTable;