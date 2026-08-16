import Investment from "../../models/Investment.js";


// ======================================================
// ROUND NUMBER
// ======================================================

const roundNumber = (
    value,
    decimals = 2
) => {

    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(value)
    ) {

        return 0;

    }


    return Number(
        value.toFixed(decimals)
    );

};


// ======================================================
// FORMAT ASSET TYPE
// ======================================================

const formatInvestmentType = (
    type
) => {

    const labels = {

        stock:
            "Stocks",

        mutual_fund:
            "Mutual Funds",

        etf:
            "ETFs",

        gold:
            "Gold",

        crypto:
            "Crypto",

        fd:
            "Fixed Deposits",

        real_estate:
            "Real Estate",

        bond:
            "Bonds",

        other:
            "Other",

    };


    return (
        labels[type] ||
        "Other"
    );

};


// ======================================================
// FORMAT MUTUAL FUND CATEGORY
// ======================================================

const formatMutualFundCategory = (
    category
) => {

    const labels = {

        index_fund:
            "Index Funds",

        flexicap:
            "Flexicap",

        large_cap:
            "Large Cap",

        mid_cap:
            "Mid Cap",

        small_cap:
            "Small Cap",

        multicap:
            "Multicap",

        elss:
            "ELSS",

        debt:
            "Debt Funds",

        other:
            "Other",

    };


    return (
        labels[category] ||
        "Other"
    );

};


// ======================================================
// GET INVESTMENT PORTFOLIO
// ======================================================

export const getInvestmentPortfolio = async (
    userId
) => {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }


    // ==============================================
    // FETCH INVESTMENTS
    // ==============================================

    const investments =
        await Investment.find({

            user: userId,

        })
        .sort({

            currentValue: -1,

        });


    // ==============================================
    // EMPTY PORTFOLIO
    // ==============================================

    if (
        investments.length === 0
    ) {

        return {

            summary: {

                totalInvested: 0,

                currentValue: 0,

                profitLoss: 0,

                roi: 0,

                holdings: 0,

            },

            allocation: [],

            typeAllocation: [],

            mutualFundCategoryAllocation: [],

            performance: [],

        };

    }


    // ==============================================
    // TOTAL PORTFOLIO VALUES
    // ==============================================

    let totalInvested = 0;

    let currentValue = 0;

    let totalProfitLoss = 0;


    investments.forEach(
        (investment) => {

            const invested =
                Number(
                    investment.investedAmount
                ) || 0;


            const current =
                Number(
                    investment.currentValue
                ) || 0;


            const profitLoss =
                current - invested;


            totalInvested +=
                invested;


            currentValue +=
                current;


            totalProfitLoss +=
                profitLoss;

        }
    );


    // ==============================================
    // PORTFOLIO ROI
    // ==============================================

    const roi =
        totalInvested > 0

            ? (
                totalProfitLoss /
                totalInvested
            ) * 100

            : 0;


    // ==============================================
    // INDIVIDUAL HOLDING ALLOCATION
    // ==============================================

    const allocation =
        investments.map(
            (investment) => {

                const value =
                    Number(
                        investment.currentValue
                    ) || 0;


                const percentage =
                    currentValue > 0

                        ? (
                            value /
                            currentValue
                        ) * 100

                        : 0;


                return {

                    id:
                        investment._id,

                    name:
                        investment.name,

                    type:
                        investment.type,

                    category:
                        investment.category ||
                        "other",

                    value:
                        roundNumber(
                            value
                        ),

                    percentage:
                        roundNumber(
                            percentage
                        ),

                };

            }
        );


    // ==============================================
    // ASSET TYPE ALLOCATION
    // ==============================================

    const typeMap = {};


    investments.forEach(
        (investment) => {

            const type =
                investment.type ||
                "other";


            const value =
                Number(
                    investment.currentValue
                ) || 0;


            if (
                !typeMap[type]
            ) {

                typeMap[type] = 0;

            }


            typeMap[type] +=
                value;

        }
    );


    const typeAllocation =
        Object.entries(
            typeMap
        )
        .map(
            ([type, value]) => {

                const percentage =
                    currentValue > 0

                        ? (
                            value /
                            currentValue
                        ) * 100

                        : 0;


                return {

                    type,

                    label:
                        formatInvestmentType(
                            type
                        ),

                    value:
                        roundNumber(
                            value
                        ),

                    percentage:
                        roundNumber(
                            percentage
                        ),

                };

            }
        )
        .sort(
            (a, b) =>
                b.value - a.value
        );


    // ==============================================
    // MUTUAL FUND CATEGORY ALLOCATION
    // ==============================================

    const mutualFundCategoryMap =
        {};


    investments.forEach(
        (investment) => {

            if (
                investment.type !==
                "mutual_fund"
            ) {

                return;

            }


            const category =
                investment.category ||
                "other";


            const value =
                Number(
                    investment.currentValue
                ) || 0;


            if (
                !mutualFundCategoryMap[
                    category
                ]
            ) {

                mutualFundCategoryMap[
                    category
                ] = 0;

            }


            mutualFundCategoryMap[
                category
            ] += value;

        }
    );


    const totalMutualFundValue =
        investments
            .filter(
                (investment) =>
                    investment.type ===
                    "mutual_fund"
            )
            .reduce(
                (
                    total,
                    investment
                ) => {

                    return (
                        total +
                        (
                            Number(
                                investment.currentValue
                            ) || 0
                        )
                    );

                },
                0
            );


    const mutualFundCategoryAllocation =
        Object.entries(
            mutualFundCategoryMap
        )
        .map(
            ([category, value]) => {

                const percentage =
                    totalMutualFundValue > 0

                        ? (
                            value /
                            totalMutualFundValue
                        ) * 100

                        : 0;


                return {

                    category,

                    label:
                        formatMutualFundCategory(
                            category
                        ),

                    value:
                        roundNumber(
                            value
                        ),

                    percentage:
                        roundNumber(
                            percentage
                        ),

                };

            }
        )
        .sort(
            (a, b) =>
                b.value - a.value
        );


    // ==============================================
    // HOLDING PERFORMANCE
    // ==============================================

    const performance =
        investments.map(
            (investment) => {

                const invested =
                    Number(
                        investment.investedAmount
                    ) || 0;


                const current =
                    Number(
                        investment.currentValue
                    ) || 0;


                const profitLoss =
                    investment.profitLoss !==
                    null &&
                    investment.profitLoss !==
                    undefined

                        ? Number(
                            investment.profitLoss
                        ) || 0

                        : current - invested;


                const calculatedROI =
                    invested > 0

                        ? (
                            profitLoss /
                            invested
                        ) * 100

                        : 0;


                return {

                    id:
                        investment._id,

                    name:
                        investment.name,

                    type:
                        investment.type,

                    category:
                        investment.category ||
                        "other",

                    units:
                        investment.units,

                    investedAmount:
                        roundNumber(
                            invested
                        ),

                    currentValue:
                        roundNumber(
                            current
                        ),

                    profitLoss:
                        roundNumber(
                            profitLoss
                        ),

                    roi:
                        roundNumber(

                            investment.roi !==
                            null &&
                            investment.roi !==
                            undefined

                                ? Number(
                                    investment.roi
                                ) || 0

                                : calculatedROI

                        ),

                    xirr:
                        investment.xirr !==
                        null &&
                        investment.xirr !==
                        undefined

                            ? roundNumber(
                                Number(
                                    investment.xirr
                                ) || 0
                            )

                            : null,

                    valuationDate:
                        investment.valuationDate,

                    source:
                        investment.source,

                };

            }
        );


    // ==============================================
    // RETURN PORTFOLIO
    // ==============================================

    return {

        summary: {

            totalInvested:
                roundNumber(
                    totalInvested
                ),

            currentValue:
                roundNumber(
                    currentValue
                ),

            profitLoss:
                roundNumber(
                    totalProfitLoss
                ),

            roi:
                roundNumber(
                    roi
                ),

            holdings:
                investments.length,

        },

        allocation,

        typeAllocation,

        mutualFundCategoryAllocation,

        performance,

    };

};