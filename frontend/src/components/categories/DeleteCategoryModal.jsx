import { useDispatch } from "react-redux";
import { removeCategory } from "../../features/category/categorySlice";

const DeleteCategoryModal = ({
    open,
    onClose,
    category,
}) => {

    const dispatch = useDispatch();

    if (!open || !category) return null;

    const handleDelete = () => {

        dispatch(removeCategory(category._id));

        onClose();

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-2xl font-bold mb-4">
                    Delete Category
                </h2>

                <p className="text-gray-600">

                    Are you sure you want to delete

                    <span className="font-semibold">
                        {" "}
                        {category.name}
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

export default DeleteCategoryModal;