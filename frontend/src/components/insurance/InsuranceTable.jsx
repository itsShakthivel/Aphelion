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

            <div className="bg-[#0f1b2d] border border-blue-900/40 rounded-xl shadow-md p-8 text-center">

                <h2 className="text-xl font-semibold text-white">

                    No Insurance Policies Found

                </h2>

                <p className="text-slate-400 mt-2">

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
                color: "bg-red-500/15 text-red-400",
            };

        }

        if (days <= 30) {

            return {
                label: "Expiring Soon",
                color: "bg-yellow-500/15 text-yellow-400",
            };

        }

        return {
            label: "Active",
            color: "bg-green-500/15 text-green-400",
        };

    };

    return (

        <div className="bg-[#0f1b2d] border border-blue-900/40 rounded-xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-[#16243a]">

                        <tr>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Policy
                            </th>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Provider
                            </th>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Type
                            </th>

                            <th className="text-right p-4 text-slate-300 font-medium">
                                Premium
                            </th>

                            <th className="text-right p-4 text-slate-300 font-medium">
                                Coverage
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
                                Start
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
                                Expiry
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
                                Status
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
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
                                    className="border-t border-blue-900/30 bg-[#0f1b2d] hover:bg-[#172b46] transition-colors duration-200"
                                >

                                    <td className="p-4 font-medium text-white">

                                        {insurance.policyName}

                                    </td>

                                    <td className="p-4 text-slate-300">

                                        {insurance.provider}

                                    </td>

                                    <td className="p-4 capitalize text-slate-300">

                                        {insurance.type}

                                    </td>

                                    <td className="p-4 text-right text-slate-300">

                                        ₹{insurance.premium.toLocaleString()}

                                    </td>

                                    <td className="p-4 text-right text-slate-300">

                                        ₹{insurance.coverage.toLocaleString()}

                                    </td>

                                    <td className="p-4 text-center text-slate-300">

                                        {new Date(
                                            insurance.startDate
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4 text-center text-slate-300">

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
                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(insurance)
                                                }
                                                className="text-red-400 hover:text-red-300 transition-colors"
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