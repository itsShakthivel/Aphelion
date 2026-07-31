import Transaction from "../../models/Transaction.js";

export const getNetWorthTimeline = async (

    userId,

    query = {}

) => {

    const months = Number(

        query.months || 12

    );

    const startDate = new Date();

    startDate.setMonth(

        startDate.getMonth() - months + 1

    );

    const transactions = await Transaction.find({

        user: userId,

        date: {

            $gte: startDate,

        },

    }).sort({

        date: 1,

    });

    const monthlyMap = {};

    transactions.forEach((transaction) => {

        const key = `${transaction.date.getFullYear()}-${String(

            transaction.date.getMonth() + 1

        ).padStart(2, "0")}`;

        if (!monthlyMap[key]) {

            monthlyMap[key] = {

                income: 0,

                expense: 0,

            };

        }

        if (transaction.type === "income") {

            monthlyMap[key].income += transaction.amount;

        }

        else {

            monthlyMap[key].expense += transaction.amount;

        }

    });

    let runningNetWorth = 0;

    const timeline = Object.entries(

        monthlyMap

    ).map(([month, values]) => {

        runningNetWorth +=

            values.income -

            values.expense;

        return {

            month,

            income: values.income,

            expense: values.expense,

            netWorth: runningNetWorth,

        };

    });

    return timeline;

};