export const getGoalSummary = (
    goals = []
) => {

    const completed = goals.filter(

        (goal) =>
            goal.currentAmount >= goal.targetAmount

    ).length;

    return {

        total: goals.length,

        completed,

        active: goals.length - completed,

    };

};