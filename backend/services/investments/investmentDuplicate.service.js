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
    brokerData = null,
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


    const isin =
        brokerData?.isin
            ? String(
                brokerData.isin
            )
                .trim()
                .toUpperCase()
            : null;


    // ==============================================
    // FIRST PRIORITY: ISIN
    // ==============================================

    if (isin) {

        const isinQuery = {

            user:
                userId,

            source:
                source || "manual",

            "brokerData.isin":
                isin,

        };


        const isinDatabaseQuery =
            Investment.findOne(
                isinQuery
            );


        if (session) {

            isinDatabaseQuery.session(
                session
            );

        }


        const investmentByISIN =
            await isinDatabaseQuery;


        if (
            investmentByISIN
        ) {

            return investmentByISIN;

        }

    }


    // ==============================================
    // FALLBACK: NAME
    // ==============================================

    const nameQuery = {

        user:
            userId,

        source:
            source || "manual",

        name: {

            $regex:
                `^${escapeRegex(
                    name.trim()
                )}$`,

            $options:
                "i",

        },

    };


    const nameDatabaseQuery =
        Investment.findOne(
            nameQuery
        );


    if (session) {

        nameDatabaseQuery.session(
            session
        );

    }


    return await nameDatabaseQuery;

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

                brokerData:
                    holding.brokerData,

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