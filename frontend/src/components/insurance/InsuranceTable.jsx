import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const InsuranceTable = ({
    insurances,
    onEdit,
    onDelete,
}) => {

    if (insurances.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-md p-8 text-center">

                <h2 className="text-xl font-semibold text-gray-600">

                    No Insurance Policies Found

                </h2>

                <p className="text-gray-500 mt-2">

                    Add your first insurance policy.

                </p>

            </div>

        );

    }

    const getStatus = (expiryDate) => {

        const today = new Date();

        const expiry = new Date(expiryDate);

        const days = Math.ceil(

            (expiry - today) /

            (1000 * 60 * 60 * 24)

        );

        if (days < 0) {

            return {
                label: "Expired",
                color: "bg-red-100 text-red-600",
            };

        }

        if (days <= 30) {

            return {
                label: "Expiring Soon",
                color: "bg-yellow-100 text-yellow-700",
            };

        }

        return {
            label: "Active",
            color: "bg-green-100 text-green-700",
        };

    };

    return (

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="text-left p-4">
                                Policy
                            </th>

                            <th className="text-left p-4">
                                Provider
                            </th>

                            <th className="text-left p-4">
                                Type
                            </th>

                            <th className="text-right p-4">
                                Premium
                            </th>

                            <th className="text-right p-4">
                                Coverage
                            </th>

                            <th className="text-center p-4">
                                Start
                            </th>

                            <th className="text-center p-4">
                                Expiry
                            </th>

                            <th className="text-center p-4">
                                Status
                            </th>

                            <th className="text-center p-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {insurances.map((insurance) => {

                            const status = getStatus(
                                insurance.expiryDate
                            );

                            return (

                                <tr
                                    key={insurance._id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4 font-medium">

                                        {insurance.policyName}

                                    </td>

                                    <td className="p-4">

                                        {insurance.provider}

                                    </td>

                                    <td className="p-4 capitalize">

                                        {insurance.type}

                                    </td>

                                    <td className="p-4 text-right">

                                        ₹{insurance.premium.toLocaleString()}

                                    </td>

                                    <td className="p-4 text-right">

                                        ₹{insurance.coverage.toLocaleString()}

                                    </td>

                                    <td className="p-4 text-center">

                                        {new Date(
                                            insurance.startDate
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4 text-center">

                                        {new Date(
                                            insurance.expiryDate
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4 text-center">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                                        >

                                            {status.label}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-4">

                                            <button
                                                onClick={() =>
                                                    onEdit(insurance)
                                                }
                                                className="text-blue-600 hover:text-blue-800"
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(insurance)
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

export default InsuranceTable;