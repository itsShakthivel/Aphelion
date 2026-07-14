import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const GoalTable = ({
    goals,
    onEdit,
    onDelete,
}) => {

    if (goals.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow-md p-8 text-center">

                <h2 className="text-xl font-semibold text-gray-600">

                    No Goals Found

                </h2>

                <p className="text-gray-500 mt-2">

                    Create your first financial goal.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="text-left p-4">

                                Goal

                            </th>

                            <th className="text-left p-4">

                                Category

                            </th>

                            <th className="text-right p-4">

                                Target

                            </th>

                            <th className="text-right p-4">

                                Saved

                            </th>

                            <th className="text-center p-4">

                                Progress

                            </th>

                            <th className="text-center p-4">

                                Target Date

                            </th>

                            <th className="text-center p-4">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {goals.map((goal) => {

                            const progress =

                                goal.targetAmount > 0

                                    ? (

                                        goal.currentAmount /

                                        goal.targetAmount

                                    ) * 100

                                    : 0;

                            return (

                                <tr
                                    key={goal._id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4 font-medium">

                                        {goal.title}

                                    </td>

                                    <td className="p-4 capitalize">

                                        {goal.category}

                                    </td>

                                    <td className="p-4 text-right">

                                        ₹{goal.targetAmount.toLocaleString()}

                                    </td>

                                    <td className="p-4 text-right">

                                        ₹{goal.currentAmount.toLocaleString()}

                                    </td>

                                    <td className="p-4">

                                        <div className="w-full">

                                            <div className="w-full bg-gray-200 rounded-full h-2.5">

                                                <div
                                                    className="bg-emerald-500 h-2.5 rounded-full transition-all"
                                                    style={{
                                                        width: `${Math.min(progress,100)}%`,
                                                    }}
                                                />

                                            </div>

                                            <p className="text-xs text-center mt-2">

                                                {progress.toFixed(1)}%

                                            </p>

                                        </div>

                                    </td>

                                    <td className="text-center p-4">

                                        {new Date(
                                            goal.targetDate
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-4">

                                            <button
                                                onClick={() =>
                                                    onEdit(goal)
                                                }
                                                className="text-blue-600 hover:text-blue-800"
                                            >

                                                <FaEdit />

                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(goal)
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

export default GoalTable;