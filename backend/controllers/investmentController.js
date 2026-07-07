import Investment from "../models/Investment.js";

// CREATE
export const createInvestment = async (req, res) => {

    try {

        const investment = await Investment.create({

            ...req.body,

            user: req.user.id,

        });

        res.status(201).json(investment);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// GET ALL
export const getInvestments = async (req, res) => {

    try {

        const investments = await Investment.find({

            user: req.user.id,

        });

        res.json(investments);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// GET ONE
export const getInvestment = async (req, res) => {

    try {

        const investment = await Investment.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!investment) {

            return res.status(404).json({
                message: "Investment not found",
            });

        }

        res.json(investment);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// UPDATE
export const updateInvestment = async (req, res) => {

    try {

        const investment =
            await Investment.findOneAndUpdate(

                {
                    _id: req.params.id,
                    user: req.user.id,
                },

                req.body,

                {
                    new: true,
                }

            );

        if (!investment) {

            return res.status(404).json({
                message: "Investment not found",
            });

        }

        res.json(investment);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// DELETE
export const deleteInvestment = async (req, res) => {

    try {

        const investment =
            await Investment.findOneAndDelete({

                _id: req.params.id,

                user: req.user.id,

            });

        if (!investment) {

            return res.status(404).json({
                message: "Investment not found",
            });

        }

        res.json({
            message: "Investment deleted",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};