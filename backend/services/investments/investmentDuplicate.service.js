import Investment from "../../models/Investment.js";


// ======================================================
// NORMALIZE INVESTMENT NAME
// ======================================================

const normalizeInvestmentName = (
    name
) => {

    return String(name || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

};


// ======================================================
// FIND EXISTING INVESTMENT
// ======================================================

export const findExistingInvestment = async ({
    userId,
    name,
    source,
}) => {

    if (!userId) {

        throw new Error(
            "User ID is required for duplicate detection."
        );

    }


    if (!name) {

        throw new Error(
            "Investment name is required for duplicate detection."
        );

    }


    const normalizedName =
        normalizeInvestmentName(
            name
        );


    const investments =
        await Investment.find({

            user: userId,

            source:
                source || "manual",

        });


    const existingInvestment =
        investments.find(
            (investment) =>
                normalizeInvestmentName(
                    investment.name
                ) === normalizedName
        );


    return existingInvestment || null;

};


// ======================================================
// CHECK MULTIPLE HOLDINGS
// ======================================================

export const checkInvestmentDuplicates = async ({
    userId,
    holdings,
}) => {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }


    if (
        !Array.isArray(holdings)
    ) {

        throw new Error(
            "Holdings must be an array."
        );

    }


    const results = [];


    for (
        const holding of holdings
    ) {

        const existingInvestment =
            await findExistingInvestment({

                userId,

                name:
                    holding.name,

                source:
                    holding.source,

            });


        results.push({

            ...holding,

            status:
                existingInvestment
                    ? "existing"
                    : "new",

            existingId:
                existingInvestment
                    ? existingInvestment._id
                    : null,

            existingInvestment:
                existingInvestment
                    ? {

                        id:
                            existingInvestment._id,

                        name:
                            existingInvestment.name,

                        investedAmount:
                            existingInvestment.investedAmount,

                        currentValue:
                            existingInvestment.currentValue,

                        profitLoss:
                            existingInvestment.profitLoss,

                        roi:
                            existingInvestment.roi,

                        xirr:
                            existingInvestment.xirr,

                        units:
                            existingInvestment.units,

                    }
                    : null,

        });

    }


    return results;

};