import Investment from "../models/Investment.js";
import parseAngelOneFundHoldings from "../services/investments/angelOneParser.js";

import {
    prepareAngelOneImport,
} from "../services/investments/investmentImport.service.js";


// ======================================================
// CREATE INVESTMENT
// ======================================================

export const createInvestment = async (req, res) => {

    try {

        const investment = await Investment.create({

            user: req.user.id,

            name: req.body.name,

            type: req.body.type,

            units: req.body.units,

            averagePrice: req.body.averagePrice,

            currentPrice: req.body.currentPrice,

            investedAmount: req.body.investedAmount,

            currentValue: req.body.currentValue,

            profitLoss: req.body.profitLoss,

            roi: req.body.roi,

            xirr: req.body.xirr,

            purchaseDate: req.body.purchaseDate,

            valuationDate: req.body.valuationDate,

            source: req.body.source || "manual",

            notes: req.body.notes,

        });


        res.status(201).json(

            investment

        );

    }

    catch (error) {

        console.error(
            "Create Investment Error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};

// ======================================================
// PREVIEW ANGEL ONE IMPORT
// ======================================================

export const previewAngelOneImport = async (
    req,
    res
) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                message:
                    "Please upload an Excel file.",

            });

        }


        const parsedData =
            parseAngelOneFundHoldings(
                req.file.buffer
            );


        const preparedData =
            await prepareAngelOneImport({
                parsedData,
                userId: req.user.id,
            });


        res.status(200).json({

            success: true,

            message:
                "Angel One portfolio parsed successfully.",

            data:
                preparedData,

        });

    }

    catch (error) {

        console.error(
            "Angel One Import Preview Error:",
            error
        );


        res.status(400).json({

            success: false,

            message:
                error.message,

        });

    }

};

// ======================================================
// GET ALL INVESTMENTS
// ======================================================

export const getInvestments = async (req, res) => {

    try {

        const investments = await Investment.find({

            user: req.user.id,

        })

        .sort({

            purchaseDate: -1,

        });


        res.json(

            investments

        );

    }

    catch (error) {

        console.error(
            "Get Investments Error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};


// ======================================================
// GET SINGLE INVESTMENT
// ======================================================

export const getInvestment = async (req, res) => {

    try {

        const investment =
            await Investment.findOne({

                _id: req.params.id,

                user: req.user.id,

            });


        if (!investment) {

            return res.status(404).json({

                message:
                    "Investment not found",

            });

        }


        res.json(

            investment

        );

    }

    catch (error) {

        console.error(
            "Get Investment Error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};


// ======================================================
// UPDATE INVESTMENT
// ======================================================

export const updateInvestment = async (
    req,
    res
) => {

    try {

        const investment =
            await Investment.findOneAndUpdate(

                {

                    _id: req.params.id,

                    user: req.user.id,

                },

                {

                    $set: {

                        name: req.body.name,

                        type: req.body.type,

                        units: req.body.units,

                        averagePrice:
                            req.body.averagePrice,

                        currentPrice:
                            req.body.currentPrice,

                        investedAmount:
                            req.body.investedAmount,

                        currentValue:
                            req.body.currentValue,

                        profitLoss:
                            req.body.profitLoss,

                        roi:
                            req.body.roi,

                        xirr:
                            req.body.xirr,

                        purchaseDate:
                            req.body.purchaseDate,

                        valuationDate:
                            req.body.valuationDate,

                        source:
                            req.body.source,

                        notes:
                            req.body.notes,

                    },

                },

                {

                    new: true,

                    runValidators: true,

                }

            );


        if (!investment) {

            return res.status(404).json({

                message:
                    "Investment not found",

            });

        }


        res.json(

            investment

        );

    }

    catch (error) {

        console.error(
            "Update Investment Error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};


// ======================================================
// DELETE INVESTMENT
// ======================================================

export const deleteInvestment = async (
    req,
    res
) => {

    try {

        const investment =
            await Investment.findOneAndDelete({

                _id: req.params.id,

                user: req.user.id,

            });


        if (!investment) {

            return res.status(404).json({

                message:
                    "Investment not found",

            });

        }


        res.json({

            message:
                "Investment deleted successfully",

        });

    }

    catch (error) {

        console.error(
            "Delete Investment Error:",
            error
        );


        res.status(500).json({

            message: error.message,

        });

    }

};