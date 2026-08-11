import { useSelector } from "react-redux";

const FamilyGoalTable = () => {

    const { goals } =
        useSelector(
            state => state.familyGoal
        );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                Goal

                            </th>

                            <th className="p-4 text-left">

                                Category

                            </th>

                            <th className="p-4 text-left">

                                Bucket

                            </th>

                            <th className="p-4 text-right">

                                Target

                            </th>

                            <th className="p-4 text-right">

                                Progress

                            </th>

                            <th className="p-4 text-left">

                                Target Date

                            </th>

                            <th className="p-4 text-left">

                                Status

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            goals.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="7"

                                        className="text-center py-10"

                                    >

                                        No Family Goals Found

                                    </td>

                                </tr>

                            ) : (

                                goals.map(

                                    goal => {

                                        const percentage =

                                            goal.targetAmount > 0

                                                ? Math.min(

                                                    (

                                                        goal.currentAmount /

                                                        goal.targetAmount

                                                    ) * 100,

                                                    100

                                                )

                                                : 0;

                                        return (

                                            <tr

                                                key={goal._id}

                                                className="border-b"

                                            >

                                                <td className="p-4">

                                                    <div className="font-medium">

                                                        {

                                                            goal.name

                                                        }

                                                    </div>

                                                    {

                                                        goal.description && (

                                                            <div className="text-sm text-gray-500">

                                                                {

                                                                    goal.description

                                                                }

                                                            </div>

                                                        )

                                                    }

                                                </td>

                                                <td className="p-4">

                                                    {

                                                        goal.category

                                                    }

                                                </td>

                                                <td className="p-4">

                                                    {

                                                        goal.bucket?.name ||

                                                        "Treasury"

                                                    }

                                                </td>

                                                <td className="p-4 text-right">

                                                    ₹ {

                                                        goal.targetAmount.toLocaleString()

                                                    }

                                                </td>

                                                <td className="p-4">

                                                    <div className="min-w-[160px]">

                                                        <div className="flex justify-between text-sm mb-1">

                                                            <span>

                                                                ₹ {

                                                                    goal.currentAmount.toLocaleString()

                                                                }

                                                            </span>

                                                            <span>

                                                                {

                                                                    Math.round(

                                                                        percentage

                                                                    )

                                                                }%

                                                            </span>

                                                        </div>

                                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                                                            <div

                                                                className="h-full bg-blue-600"

                                                                style={{

                                                                    width:

                                                                        `${percentage}%`,

                                                                }}

                                                            />

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="p-4">

                                                    {

                                                        goal.targetDate

                                                            ? new Date(

                                                                goal.targetDate

                                                            ).toLocaleDateString()

                                                            : "-"

                                                    }

                                                </td>

                                                <td className="p-4">

                                                    {

                                                        goal.status

                                                    }

                                                </td>

                                            </tr>

                                        );

                                    }

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default FamilyGoalTable;