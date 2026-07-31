export const getReportTemplate = (

    reportType = "monthly"

) => {

    const templates = {

        monthly: {

            title: "Monthly Financial Report",

            sections: [

                "overview",

                "financialHealth",

                "netWorth",

                "expenseAnalytics",

                "incomeAnalytics",

                "cashFlow",

                "monthlyExpenseTrend",

                "fire",

            ],

        },

        annual: {

            title: "Annual Financial Report",

            sections: [

                "overview",

                "financialHealth",

                "netWorth",

                "expenseAnalytics",

                "incomeAnalytics",

                "cashFlow",

                "monthlyExpenseTrend",

                "netWorthTimeline",

                "fire",

            ],

        },

        fire: {

            title: "FIRE Progress Report",

            sections: [

                "overview",

                "netWorth",

                "financialHealth",

                "fire",

                "cashFlow",

            ],

        },

    };

    return (

        templates[reportType] ||

        templates.monthly

    );

};