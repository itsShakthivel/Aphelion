import Investment from "../../models/Investment.js";

import {
    normalizeAngelOneHoldings,
} from "./investmentNormalizer.js";

import {
    findExistingInvestment,
    checkInvestmentDuplicates,
} from "./investmentDuplicate.service.js";

import {
    validateImportedHoldings,
    validateNoDuplicateHoldings,
} from "./investmentImport.validator.js";


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
    // NORMALIZE
    // ==============================================

    const normalizedHoldings =
        normalizeAngelOneHoldings(
            parsedData.holdings
        );


    // ==============================================
    // VALIDATE NORMALIZED DATA
    // ==============================================

    validateImportedHoldings(
        normalizedHoldings
    );

    validateNoDuplicateHoldings(
        normalizedHoldings
    );


    // ==============================================
    // DUPLICATE DETECTION
    // ==============================================

    const holdingsWithStatus =
        await checkInvestmentDuplicates({

            userId,

            holdings:
                normalizedHoldings,

        });


    // ==============================================
    // SUMMARY
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


    // ==============================================
    // RETURN PREVIEW
    // ==============================================

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


// ======================================================
// IMPORT ANGEL ONE HOLDINGS
// ======================================================

export const importAngelOneHoldings = async ({
    userId,
    holdings,
}) => {

    if (!userId) {

        throw new Error(
            "User ID is required."
        );

    }


    // ==============================================
    // VALIDATE INCOMING DATA
    // ==============================================

    validateImportedHoldings(
        holdings
    );

    validateNoDuplicateHoldings(
        holdings
    );


    // ==============================================
    // START MONGODB TRANSACTION
    // ==============================================

    const session =
        await Investment.startSession();


    const results = {

        total:
            holdings.length,

        created: 0,

        updated: 0,

        skipped: 0,

        failed: 0,

        createdInvestments: [],

        updatedInvestments: [],

        skippedInvestments: [],

        failedInvestments: [],

    };


    try {

        await session.withTransaction(
            async () => {

                // ==========================================
                // PROCESS EACH HOLDING
                // ==========================================

                for (
                    const holding of holdings
                ) {

                    // --------------------------------------
                    // FIND EXISTING INVESTMENT
                    // --------------------------------------

                    const existingInvestment =
                        await findExistingInvestment({

                            userId,

                            name:
                                holding.name,

                            source:
                                "angel_one",

                            brokerData:
                                holding.brokerData,

                            session,

                        });


                    // --------------------------------------
                    // UPDATE EXISTING
                    // --------------------------------------

                    if (
                        existingInvestment
                    ) {

                        existingInvestment.type =
                            holding.type;

                        existingInvestment.units =
                            holding.units;

                        existingInvestment.averagePrice =
                            holding.averagePrice;

                        existingInvestment.currentPrice =
                            holding.currentPrice;

                        existingInvestment.investedAmount =
                            holding.investedAmount;

                        existingInvestment.currentValue =
                            holding.currentValue;

                        existingInvestment.profitLoss =
                            holding.profitLoss;

                        existingInvestment.roi =
                            holding.roi;

                        existingInvestment.xirr =
                            holding.xirr;

                        existingInvestment.valuationDate =
                            holding.valuationDate;

                        existingInvestment.notes =
                            holding.notes;


                        const updatedInvestment =
                            await existingInvestment.save({

                                session,

                            });


                        results.updated += 1;


                        results.updatedInvestments.push({

                            id:
                                updatedInvestment._id,

                            name:
                                updatedInvestment.name,

                            currentValue:
                                updatedInvestment.currentValue,

                        });


                        continue;

                    }


                    // --------------------------------------
                    // CREATE NEW
                    // --------------------------------------

                    const created =
                        await Investment.create(

                            [
                                {

                                    user:
                                        userId,

                                    name:
                                        holding.name,

                                    type:
                                        holding.type,

                                    units:
                                        holding.units,

                                    averagePrice:
                                        holding.averagePrice,

                                    currentPrice:
                                        holding.currentPrice,

                                    investedAmount:
                                        holding.investedAmount,

                                    currentValue:
                                        holding.currentValue,

                                    profitLoss:
                                        holding.profitLoss,

                                    roi:
                                        holding.roi,

                                    xirr:
                                        holding.xirr,

                                    purchaseDate:
                                        holding.purchaseDate,

                                    valuationDate:
                                        holding.valuationDate,

                                    source:
                                        "angel_one",

                                    notes:
                                        holding.notes,

                                },

                            ],

                            {

                                session,

                            }

                        );


                    const newInvestment =
                        created[0];


                    results.created += 1;


                    results.createdInvestments.push({

                        id:
                            newInvestment._id,

                        name:
                            newInvestment.name,

                        currentValue:
                            newInvestment.currentValue,

                    });

                }

            }
        );


        return results;

    }

    catch (error) {

        console.error(
            "Angel One Database Import Error:",
            error
        );


        throw new Error(

            `Angel One import failed. No changes were saved. ${error.message}`

        );

    }

    finally {

        await session.endSession();

    }

};