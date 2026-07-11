const TransactionDetailsModal = ({
    open,
    onClose,
    transaction,
}) => {

    if (!open || !transaction) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Transaction Details
                </h2>

                <div className="space-y-4">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Amount
                        </p>

                        <p className="text-2xl font-bold">
                            ₹ {transaction.amount.toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">
                            Type
                        </p>

                        <p>
                            {transaction.type}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">
                            Category
                        </p>

                        <p>
                            {transaction.category?.name || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">
                            Description
                        </p>

                        <p>
                            {transaction.description || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">
                            Date
                        </p>

                        <p>
                            {new Date(transaction.date).toLocaleDateString()}
                        </p>
                    </div>

                    <hr />

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <p className="text-gray-500 text-sm">
                                Created
                            </p>

                            <p className="text-sm">
                                {new Date(
                                    transaction.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                Updated
                            </p>

                            <p className="text-sm">
                                {new Date(
                                    transaction.updatedAt
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex justify-end mt-8">

                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

};

export default TransactionDetailsModal;