import Transaction from "../../models/Transaction.js";

import {
    getDateRange,
    roundAmount,
} from "../../utils/analyticsUtils.js";

export const getInvestmentAnalytics = async (
    userId,
    query
) => {

    const { start, end } =
        getDateRange(query);

    const transactions =
        await Transaction.find({
            user: userId,
            type: "investment",
            date: {
                $gte: start,
                $lte: end,
            },
        })
            .populate("investmentId")
            .lean();

    let total = 0;
    let sip = 0;
    let oneTime = 0;

    const investmentMap = new Map();

    transactions.forEach(
        (transaction) => {

            const amount =
                Number(
                    transaction.amount || 0
                );

            total += amount;

            if (
                transaction.investmentMode ===
                "sip"
            ) {

                sip += amount;

            }

            if (
                transaction.investmentMode ===
                "one_time"
            ) {

                oneTime += amount;

            }

            const investment =
                transaction.investmentId;

            const investmentKey =
                investment?._id?.toString() ||
                "unlinked";

            const existing =
                investmentMap.get(
                    investmentKey
                );

            if (existing) {

                existing.amount +=
                    amount;

                existing.transactions +=
                    1;

                if (
                    transaction.investmentMode ===
                    "sip"
                ) {

                    existing.sip +=
                        amount;

                }

                if (
                    transaction.investmentMode ===
                    "one_time"
                ) {

                    existing.oneTime +=
                        amount;

                }

            } else {

                investmentMap.set(
                    investmentKey,
                    {
                        investmentId:
                            investment?._id ||
                            null,

                        investmentName:
                            investment?.name ||
                            "Unlinked Investment",

                        investmentType:
                            investment?.type ||
                            "other",

                        amount,

                        sip:
                            transaction.investmentMode ===
                            "sip"
                                ? amount
                                : 0,

                        oneTime:
                            transaction.investmentMode ===
                            "one_time"
                                ? amount
                                : 0,

                        transactions:
                            1,
                    }
                );

            }

        }
    );

    const byInvestment =
        Array.from(
            investmentMap.values()
        )
            .map(
                (item) => ({
                    ...item,

                    amount:
                        roundAmount(
                            item.amount
                        ),

                    sip:
                        roundAmount(
                            item.sip
                        ),

                    oneTime:
                        roundAmount(
                            item.oneTime
                        ),
                })
            )
            .sort(
                (a, b) =>
                    b.amount -
                    a.amount
            );

    return {

        total:
            roundAmount(total),

        sip:
            roundAmount(sip),

        oneTime:
            roundAmount(oneTime),

        transactionCount:
            transactions.length,

        byInvestment,

    };

};