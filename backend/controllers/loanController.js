import Loan from "../models/Loan.js";

import { generateNotification } from "../services/notification/notificationGenerator.service.js";

// ==========================
// Create Loan
// ==========================

export const createLoan = async (req, res) => {

    try {

        const loan = await Loan.create({

            user: req.user.id,

            loanName: req.body.loanName,

            type: req.body.type,

            lender: req.body.lender,

            principalAmount: req.body.principalAmount,

            outstandingAmount: req.body.outstandingAmount,

            interestRate: req.body.interestRate,

            emi: req.body.emi,

            startDate: req.body.startDate,

            endDate: req.body.endDate,

            notes: req.body.notes,

        });

        await generateNotification({

            user: req.user.id,

            title: "Loan Added",

            message: `${loan.loanName} has been added successfully.`,

            type: "Loan",

            priority: "Info",

            action: "View Loan",

            link: "/loans",

            payload: {

                loanId: loan._id,

            },

        });

        res.status(201).json(loan);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get All Loans
// ==========================

export const getLoans = async (req, res) => {

    try {

        const loans = await Loan.find({

            user: req.user.id,

        }).sort({

            endDate: 1,

        });

        res.json(loans);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get Single Loan
// ==========================

export const getLoan = async (req, res) => {

    try {

        const loan = await Loan.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!loan) {

            return res.status(404).json({

                message: "Loan not found",

            });

        }

        res.json(loan);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Update Loan
// ==========================

export const updateLoan = async (req, res) => {

    try {

        const loan = await Loan.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!loan) {

            return res.status(404).json({

                message: "Loan not found",

            });

        }

        // ------------------------------------
        // Store previous outstanding amount
        // ------------------------------------

        const previousOutstanding =
            loan.outstandingAmount;

        // ------------------------------------
        // Update loan
        // ------------------------------------

        Object.assign(loan, req.body);

        await loan.save();

        // ------------------------------------
        // Loan Paid Notification
        // ------------------------------------

        if (

            previousOutstanding > 0 &&

            loan.outstandingAmount <= 0

        ) {

            await generateNotification({

                user: req.user.id,

                title: "Loan Paid Off 🎉",

                message: `${loan.loanName} has been fully paid.`,

                type: "Loan",

                priority: "High",

                action: "View Loan",

                link: "/loans",

                payload: {

                    loanId: loan._id,

                },

            });

        }

        res.json(loan);

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Delete Loan
// ==========================

export const deleteLoan = async (req, res) => {

    try {

        const loan = await Loan.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!loan) {

            return res.status(404).json({

                message: "Loan not found",

            });

        }

        res.json({

            message: "Loan deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};