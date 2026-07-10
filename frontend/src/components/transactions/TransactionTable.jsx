import {
    FaEye,
    FaPen,
    FaTrash,
} from "react-icons/fa6";

const TransactionTable = ({
    transactions,
    hasFilters,
    onView,
    onEdit,
    onDelete,
}) => {

    if (!transactions.length) {
        return (
            <div className="bg-white rounded-xl shadow-md p-10 text-center">
                <h3 className="text-xl font-semibold text-gray-700">
                    {hasFilters
                        ? "No matching transactions"
                        : "No Transactions Found"}
                </h3>

                <p className="text-gray-500 mt-2">
                    {hasFilters
                        ? "Try changing your search or filters"
                        : "Start by adding your first transaction."}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left px-6 py-4">
                                Date
                            </th>

                            <th className="text-left px-6 py-4">
                                Category
                            </th>

                            <th className="text-left px-6 py-4">
                                Description
                            </th>

                            <th className="text-right px-6 py-4">
                                Amount
                            </th>

                            <th className="text-center px-6 py-4">
                                Type
                            </th>

                            <th className="text-center px-6 py-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {transactions.map((transaction) => (

                            <tr
                                key={transaction._id}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                <td className="px-6 py-4">
                                    {new Date(
                                        transaction.date
                                    ).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4">
                                    {transaction.category?.name || "-"}
                                </td>

                                <td className="px-6 py-4">
                                    {transaction.description}
                                </td>

                                <td className="px-6 py-4 text-right font-semibold">

                                    ₹
                                    {transaction.amount.toLocaleString()}

                                </td>

                                <td className="text-center">

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                        ${
                                            transaction.type === "income"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {transaction.type}
                                    </span>

                                </td>

                                <td>

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => onView(transaction)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            onClick={() => onEdit(transaction)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            <FaPen />
                                        </button>

                                        <button
                                            onClick={() => onDelete(transaction)}
                                            className="text-red-500 hover:text-red-700"
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

export default TransactionTable;