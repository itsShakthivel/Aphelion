import Loan from "../models/Loan.js";

// CREATE
export const createLoan =
    async (req, res) => {

        try {

            const loan =
                await Loan.create({

                    ...req.body,

                    user:
                        req.user.id,
                });

            res
                .status(201)
                .json(loan);

        } catch (error) {

            res
                .status(500)
                .json({
                    message:
                        error.message,
                });

        }
};

// GET
export const getLoans =
    async (req, res) => {

        try {

            const loans =
                await Loan.find({
                    user:
                        req.user.id,
                });

            res.json(loans);

        } catch (error) {

            res
                .status(500)
                .json({
                    message:
                        error.message,
                });

        }
};

// UPDATE
export const updateLoan =
    async (req, res) => {

        try {

            const loan =
                await Loan
                    .findByIdAndUpdate(

                        req.params.id,

                        req.body,

                        {
                            new: true,
                        }
                    );

            res.json(loan);

        } catch (error) {

            res
                .status(500)
                .json({
                    message:
                        error.message,
                });

        }
};

// DELETE
export const deleteLoan =
    async (req, res) => {

        try {

            await Loan
                .findByIdAndDelete(
                    req.params.id
                );

            res.json({
                message:
                    "Loan deleted",
            });

        } catch (error) {

            res
                .status(500)
                .json({
                    message:
                        error.message,
                });

        }
};