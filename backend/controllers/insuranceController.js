import Insurance from "../models/Insurance.js";

// CREATE
export const createInsurance =
    async (req, res) => {

        try {

            const insurance =
                await Insurance.create({

                    ...req.body,

                    user:
                        req.user.id,
                });

            res
                .status(201)
                .json(insurance);

        } catch (error) {

            res
                .status(500)
                .json({
                    message:
                        error.message,
                });

        }
};

// GET ALL
export const getInsurances =
    async (req, res) => {

        try {

            const insurances =
                await Insurance.find({
                    user:
                        req.user.id,
                });

            res.json(insurances);

        } catch (error) {

            res
                .status(500)
                .json({
                    message:
                        error.message,
                });

        }
};

// GET SINGLE INSURANCE
export const getInsurance = async (req, res) => {
    try {

        const insurance = await Insurance.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!insurance) {
            return res.status(404).json({
                message: "Insurance not found",
            });
        }

        res.json(insurance);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// UPDATE
export const updateInsurance =
    async (req, res) => {

        try {

            const insurance =
                await Insurance
                    .findByIdAndUpdate(

                        req.params.id,

                        req.body,

                        {
                            new: true,
                        }
                    );

            res.json(insurance);

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
export const deleteInsurance =
    async (req, res) => {

        try {

            await Insurance
                .findByIdAndDelete(
                    req.params.id
                );

            res.json({
                message:
                    "Insurance deleted",
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