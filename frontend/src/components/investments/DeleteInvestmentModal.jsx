import { useDispatch } from "react-redux";
import { removeInvestment } from "../../features/investment/investmentSlice";

const DeleteInvestmentModal = ({
    open,
    onClose,
    investment,
}) => {

    const dispatch = useDispatch();

    if (!open || !investment) return null;

    const handleDelete = async () => {

        await dispatch(
            removeInvestment(investment._id)
        );

        onClose();

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Delete Investment
                </h2>

                <p className="text-gray-600">

                    Are you sure you want to delete

                    <span className="font-semibold">

                        {" "}

                        {investment.name}

                    </span>

                    ?

                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteInvestmentModal;