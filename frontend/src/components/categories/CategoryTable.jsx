import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const CategoryTable = ({
    categories,
    onEdit,
    onDelete,
}) => {

    if (categories.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-md p-10 text-center">

                <h2 className="text-xl font-semibold">
                    No Categories Found
                </h2>

                <p className="text-gray-500 mt-2">
                    Create your first category to get started.
                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="text-left p-4">
                            Icon
                        </th>

                        <th className="text-left p-4">
                            Name
                        </th>

                        <th className="text-left p-4">
                            Type
                        </th>

                        <th className="text-left p-4">
                            Group
                        </th>

                        <th className="text-left p-4">
                            Color
                        </th>

                        <th className="text-center p-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {categories.map((category) => (

                        <tr
                            key={category._id}
                            className="border-t hover:bg-slate-50"
                        >

                            <td className="p-4 text-2xl">
                                {category.icon}
                            </td>

                            <td className="p-4 font-medium capitalize">
                                {category.name}
                            </td>

                            <td className="p-4 capitalize">
                                {category.type}
                            </td>

                            <td className="p-4">
                                {category.group}
                            </td>

                            <td className="p-4">

                                <div
                                    className="w-8 h-8 rounded-full border"
                                    style={{
                                        backgroundColor: category.color,
                                    }}
                                />

                            </td>

                            <td className="p-4">

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() => onEdit(category)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => onDelete(category)}
                                        className="text-red-600 hover:text-red-800"
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

    );

};

export default CategoryTable;