import {
    normalizeAngelOneHoldings,
} from "./investmentNormalizer.js";

import {
    checkInvestmentDuplicates,
} from "./investmentDuplicate.service.js";


// ======================================================
// PREPARE ANGEL ONE IMPORT
// ======================================================

export const prepareAngelOneImport = async ({
    parsedData,
    userId,
}) => {

    if (!parsedData) {

        throw new Error(
            "No parsed investment data was provided."
        );

    }


    if (
        parsedData.broker !==
        "angel_one"
    ) {

        throw new Error(
            "Unsupported investment broker."
        );

    }


    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }


    // ==============================================
    // Normalize
    // ==============================================

    const normalizedHoldings =
        normalizeAngelOneHoldings(
            parsedData.holdings
        );


    // ==============================================
    // Duplicate Detection
    // ==============================================

    const holdingsWithStatus =
        await checkInvestmentDuplicates({

            userId,

            holdings:
                normalizedHoldings,

        });


    // ==============================================
    // Summary
    // ==============================================

    const newCount =
        holdingsWithStatus.filter(
            (holding) =>
                holding.status === "new"
        ).length;


    const existingCount =
        holdingsWithStatus.filter(
            (holding) =>
                holding.status === "existing"
        ).length;


    return {

        broker:
            parsedData.broker,

        worksheet:
            parsedData.worksheet,

        valuationDate:
            parsedData.valuationDate,

        holdings:
            holdingsWithStatus,

        count:
            holdingsWithStatus.length,

        summary: {

            total:
                holdingsWithStatus.length,

            new:
                newCount,

            existing:
                existingCount,

        },

    };

};