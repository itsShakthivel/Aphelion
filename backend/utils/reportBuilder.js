export const buildFinancialReport = ({
    overview,
    expenses,
    investments,
    goals,
    loans,
    insurance,
    fire,
    health,
    insights,
}) => {

    return {

        generatedAt: new Date(),

        overview,

        expenses,

        investments,

        goals,

        loans,

        insurance,

        fire,

        health,

        insights,

    };

};