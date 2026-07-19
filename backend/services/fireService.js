import Transaction from "../models/Transaction.js";
import Investment from "../models/Investment.js";

import { calculateFIRE } from "../utils/fireCalculator.js";
import { generateFIRETimeline } from "../utils/fireTimelineGenerator.js";

export const getFIREData = async (
    userId,
    query = {}
) => {

    const now = new Date();

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    // ==========================
    // Monthly Income
    // ==========================

    const incomeTransactions =
        await Transaction.find({

            user: userId,

            type: "income",

            date: { $gte: startOfMonth },

        });

    const monthlyIncome =
        incomeTransactions.reduce(

            (sum, tx) => sum + tx.amount,

            0

        );

    // ==========================
    // Monthly Expenses
    // ==========================

    const expenseTransactions =
        await Transaction.find({

            user: userId,

            type: "expense",

            date: { $gte: startOfMonth },

        });

    const monthlyExpense =
        expenseTransactions.reduce(

            (sum, tx) => sum + tx.amount,

            0

        );

    // ==========================
    // Investments
    // ==========================

    const investments =
        await Investment.find({

            user: userId,

        });

    const currentInvestments =
        investments.reduce(

            (sum, investment) =>

                sum + investment.currentValue,

            0

        );

    // ==========================
    // Monthly SIP
    // ==========================

    const monthlyInvestment =
        investments.reduce(

            (sum, investment) =>

                sum + (investment.monthlyContribution || 0),

            0

        );

    // ==========================
    // Cash Savings
    // ==========================

    const currentSavings =
        Math.max(

            monthlyIncome - monthlyExpense,

            0

        );

    // ==========================
    // Current Wealth
    // ==========================

    const currentWealth = currentSavings + currentInvestments;

    // ==========================
    // FIRE Calculation
    // ==========================

    const planner = calculateFIRE({

        monthlyExpense,

        currentWealth,

        monthlyInvestment,

        expectedReturn:
            Number(query.expectedReturn) || 12,

        inflation:
            Number(query.inflation) || 6,

        currentAge:
            Number(query.currentAge) || 25,

        retirementAge:
            Number(query.retirementAge) || 50,

        fireMultiplier:
            Number(query.fireMultiplier) || 25,

    });

    // ==========================
    // FIRE Timeline
    // ==========================

    const timeline = generateFIRETimeline({

        currentAge: planner.currentAge,

        currentWealth: planner.currentWealth,

        monthlyInvestment: planner.monthlyInvestment,

        expectedReturn: planner.expectedReturn,

        inflation: planner.inflation,

        fireCorpus: planner.fireCorpus,

    });

    return {

        ...planner,

        timeline,

    };

};