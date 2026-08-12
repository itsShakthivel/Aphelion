import Family from "../../models/Family.js";
import FamilyTreasury from "../../models/FamilyTreasury.js";
import Contribution from "../../models/Contribution.js";
import FamilyTransaction from "../../models/FamilyTransaction.js";
import FamilyInvestment from "../../models/FamilyInvestment.js";
import FamilyLoan from "../../models/FamilyLoan.js";
import FamilyInsurance from "../../models/FamilyInsurance.js";
import FamilyGoal from "../../models/FamilyGoal.js";
import TreasuryBucket from "../../models/TreasuryBucket.js";

// ============================================
// Generate Household Report Data
// ============================================

export const generateFamilyReportService = async (

    userId,

    familyId,

    treasuryId

) => {

    const family = await Family.findOne({

        _id: familyId,

        "members.user": userId,

        isActive: true,

    })

        .populate(

            "owner",

            "name email"

        )

        .populate(

            "members.user",

            "name email avatar"

        );

    if (!family) {

        throw new Error(
            "Household not found."
        );

    }

    const treasury =
        await FamilyTreasury.findOne({

            _id: treasuryId,

            family: familyId,

        });

    if (!treasury) {

        throw new Error(
            "Household treasury not found."
        );

    }

    const [

        contributions,

        transactions,

        investments,

        loans,

        insurance,

        goals,

        buckets,

    ] = await Promise.all([

        Contribution.find({

            family: familyId,

            treasury: treasuryId,

        })

            .populate(

                "contributor",

                "name email"

            )

            .sort({

                date: -1,

            }),

        FamilyTransaction.find({

            family: familyId,

            treasury: treasuryId,

        })

            .populate(

                "paidBy",

                "name email"

            )

            .sort({

                date: -1,

            }),

        FamilyInvestment.find({

            family: familyId,

            treasury: treasuryId,

        })

            .sort({

                createdAt: -1,

            }),

        FamilyLoan.find({

            family: familyId,

            treasury: treasuryId,

        })

            .sort({

                createdAt: -1,

            }),

        FamilyInsurance.find({

            family: familyId,

            treasury: treasuryId,

        })

            .sort({

                renewalDate: 1,

            }),

        FamilyGoal.find({

            family: familyId,

            treasury: treasuryId,

        })

            .sort({

                targetDate: 1,

            }),

        TreasuryBucket.find({

            family: familyId,

            treasury: treasuryId,

            isActive: true,

        })

            .sort({

                createdAt: 1,

            }),

    ]);

    // ========================================
    // Calculations
    // ========================================

    const totalContributions =
        contributions.reduce(

            (total, contribution) =>

                total +

                Number(
                    contribution.amount || 0
                ),

            0

        );

    const totalExpenses =
        transactions

            .filter(
                transaction =>
                    transaction.type ===
                    "Expense"
            )

            .reduce(

                (total, transaction) =>

                    total +

                    Number(
                        transaction.amount || 0
                    ),

                0

            );

    const totalInvestments =
        investments.reduce(

            (total, investment) =>

                total +

                Number(
                    investment.amount || 0
                ),

            0

        );

    const totalDebt =
        loans

            .filter(
                loan =>
                    loan.status !==
                    "Paid" &&

                    loan.status !==
                    "Cancelled"
            )

            .reduce(

                (total, loan) =>

                    total +

                    Number(
                        loan.remainingAmount || 0
                    ),

                0

            );

    const activeInsurance =
        insurance.filter(

            policy =>
                policy.status ===
                "Active"

        );

    const activeGoals =
        goals.filter(

            goal =>
                goal.status ===
                "Active"

        );

    return {

        generatedAt:
            new Date(),

        family: {

            id:
                family._id,

            name:
                family.name,

            description:
                family.description,

            owner:
                family.owner,

            members:
                family.members,

        },

        treasury: {

            totalBalance:
                treasury.totalBalance || 0,

            availableBalance:
                treasury.availableBalance || 0,

            emergencyReserve:
                treasury.emergencyReserve || 0,

            investmentReserve:
                treasury.investmentReserve || 0,

            goalReserve:
                treasury.goalReserve || 0,

        },

        contributions: {

            total:
                totalContributions,

            count:
                contributions.length,

            records:
                contributions,

        },

        transactions: {

            totalExpenses:
                totalExpenses,

            count:
                transactions.length,

            records:
                transactions,

        },

        investments: {

            total:
                totalInvestments,

            count:
                investments.length,

            records:
                investments,

        },

        loans: {

            outstanding:
                totalDebt,

            count:
                loans.length,

            records:
                loans,

        },

        insurance: {

            activeCount:
                activeInsurance.length,

            records:
                insurance,

        },

        goals: {

            activeCount:
                activeGoals.length,

            records:
                goals,

        },

        buckets: {

            count:
                buckets.length,

            records:
                buckets,

        },

        analytics: {

            contributionGrowth:
                totalContributions,

            expenseTotal:
                totalExpenses,

            investmentTotal:
                totalInvestments,

            debtTotal:
                totalDebt,

        },

        aiSummary: {

            summary:
                "Household AI Summary will be generated by the Household AI Twin.",

        },

    };

};