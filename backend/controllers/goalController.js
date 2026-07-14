import Goal from "../models/Goal.js";

// ==========================
// Create Goal
// ==========================

export const createGoal = async (req, res) => {

    try {

        const goal = await Goal.create({

            user: req.user.id,

            title: req.body.title,

            category: req.body.category,

            targetAmount: req.body.targetAmount,

            currentAmount: req.body.currentAmount,

            targetDate: req.body.targetDate,

            notes: req.body.notes,

        });

        res.status(201).json(goal);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get All Goals
// ==========================

export const getGoals = async (req, res) => {

    try {

        const goals = await Goal.find({

            user: req.user.id,

        }).sort({

            targetDate: 1,

        });

        res.json(goals);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get Single Goal
// ==========================

export const getGoal = async (req, res) => {

    try {

        const goal = await Goal.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!goal) {

            return res.status(404).json({

                message: "Goal not found",

            });

        }

        res.json(goal);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Update Goal
// ==========================

export const updateGoal = async (req, res) => {

    try {

        const goal = await Goal.findOneAndUpdate(

            {

                _id: req.params.id,

                user: req.user.id,

            },

            req.body,

            {

                new: true,

                runValidators: true,

            }

        );

        if (!goal) {

            return res.status(404).json({

                message: "Goal not found",

            });

        }

        res.json(goal);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Delete Goal
// ==========================

export const deleteGoal = async (req, res) => {

    try {

        const goal = await Goal.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!goal) {

            return res.status(404).json({

                message: "Goal not found",

            });

        }

        res.json({

            message: "Goal deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};