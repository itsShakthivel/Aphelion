import Retirement
from "../models/Retirement.js";

export const saveRetirement =
    async (req, res) => {

        try {

            let retirement =
                await Retirement
                    .findOne({

                        user:
                            req.user.id,
                    });

            if (retirement) {

                retirement =
                    await Retirement
                        .findOneAndUpdate(

                            {
                                user:
                                    req.user.id,
                            },

                            req.body,

                            {
                                new: true,
                            }
                        );

            } else {

                retirement =
                    await Retirement
                        .create({

                            ...req.body,

                            user:
                                req.user.id,
                        });
            }

            res.json(
                retirement
            );

        } catch (error) {

            res
                .status(500)
                .json({

                    message:
                        error.message,
                });

        }
};

export const getRetirement =
    async (req, res) => {

        try {

            const retirement =
                await Retirement
                    .findOne({

                        user:
                            req.user.id,
                    });

            res.json(
                retirement
            );

        } catch (error) {

            res
                .status(500)
                .json({

                    message:
                        error.message,
                });

        }
};