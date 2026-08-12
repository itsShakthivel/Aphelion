import { useSelector } from "react-redux";

const FamilyGoalProgress = () => {

    const {
        goalProgress,
    } = useSelector(
        state => state.familyAnalytics
    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Goal Progress

            </h2>

            {goalProgress.length === 0 ? (

                <div className="py-10 text-center text-gray-500">

                    No household goals available.

                </div>

            ) : (

                <div className="space-y-6">

                    {goalProgress.map(goal => {

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

                            <div
                                key={goal._id}
                            >

                                <div className="flex justify-between mb-2">

                                    <div>

                                        <p className="font-medium">

                                            {goal.name}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            ₹ {

                                                Number(
                                                    goal.currentAmount
                                                ).toLocaleString()

                                            }

                                            {" / "}

                                            ₹ {

                                                Number(
                                                    goal.targetAmount
                                                ).toLocaleString()

                                            }

                                        </p>

                                    </div>

                                    <span className="text-sm font-medium">

                                        {Math.round(
                                            percentage
                                        )}%

                                    </span>

                                </div>

                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-blue-600"
                                        style={{
                                            width:
                                                `${percentage}%`,
                                        }}
                                    />

                                </div>

                                <div className="flex justify-between mt-2 text-xs text-gray-500">

                                    <span>

                                        {goal.status}

                                    </span>

                                    <span>

                                        {goal.targetDate

                                            ? new Date(
                                                goal.targetDate
                                            ).toLocaleDateString()

                                            : "No target date"

                                        }

                                    </span>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

};

export default FamilyGoalProgress;