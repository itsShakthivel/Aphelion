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
            <div className="bg-[#0f1b2d] border border-blue-900/40 rounded-xl shadow-md p-10 text-center">
                <h2 className="text-xl font-semibold text-white">
                    No Categories Found
                </h2>

                <p className="text-slate-400 mt-2">
                    Create your first category to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#0f1b2d] border border-blue-900/40 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#16243a]">
                        <tr>
                            <th className="text-left p-4 text-slate-300 font-medium">
                                Icon
                            </th>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Name
                            </th>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Type
                            </th>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Group
                            </th>

                            <th className="text-left p-4 text-slate-300 font-medium">
                                Color
                            </th>

                            <th className="text-center p-4 text-slate-300 font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr
                                key={category._id}
                                className="border-t border-blue-900/30 bg-[#0f1b2d] hover:bg-[#172b46] transition-colors duration-200"
                            >
                                <td className="p-4 text-2xl text-white">
                                    {category.icon}
                                </td>

                                <td className="p-4 font-medium capitalize text-white">
                                    {category.name}
                                </td>

                                <td className="p-4 capitalize text-slate-300">
                                    {category.type}
                                </td>

                                <td className="p-4 text-slate-300">
                                    {category.group}
                                </td>

                                <td className="p-4">
                                    <div
                                        className="w-8 h-8 rounded-full border border-white/20"
                                        style={{
                                            backgroundColor: category.color,
                                        }}
                                    />
                                </td>

                                <td className="p-4">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => onEdit(category)}
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() => onDelete(category)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
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

export default CategoryTable;