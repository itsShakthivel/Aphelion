import Investment from "../../models/Investment.js";


// ======================================================
// NORMALIZE INVESTMENT NAME
// ======================================================

export const normalizeInvestmentName = (
    name
) => {

    return String(name || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

};


// ======================================================
// ESCAPE REGEX
// ======================================================

export const escapeRegex = (
    value
) => {

    return String(value)
        .replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

};


// ======================================================
// FIND EXISTING INVESTMENT
// ======================================================

export const findExistingInvestment = async ({
    userId,
    name,
    source,
    session = null,
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


    const query = {

        user: userId,

        source:
            source || "manual",

        name: {

            $regex:
                `^${escapeRegex(
                    name.trim()
                )}$`,

            $options: "i",

        },

    };


    const databaseQuery =
        Investment.findOne(
            query
        );


    if (session) {

        databaseQuery.session(
            session
        );

    }


    return await databaseQuery;

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
        !Array.isArray(
            holdings
        )
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