import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    removeTransaction,
} from "../../features/transaction/transactionSlice";

const DeleteTransactionModal = ({
    open,
    onClose,
    transaction,
}) => {

    const dispatch = useDispatch();

    if (!open || !transaction) return null;

    const handleDelete = async () => {

        try {

            await dispatch(
                removeTransaction(transaction._id)
            ).unwrap();

            toast.success("Transaction deleted");

            onClose();

        } catch (error) {

            toast.error(error);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-2xl font-bold text-red-600">
                    Delete Transaction
                </h2>

                <p className="mt-4 text-gray-600">

                    Are you sure you want to delete

                    <span className="font-semibold">

                        {" "}
                        "{transaction.description}"

                    </span>

                    ?

                </p>

                <p className="text-sm text-gray-500 mt-2">

                    This action cannot be undone.

                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="border rounded-lg px-5 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 py-2"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteTransactionModal;