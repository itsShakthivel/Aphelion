import Goal from "../models/Goal";

// CREATE
export const createGoal = async (req, res) => {

    try {

        const goal = await Goal.create({

            ...req.body,

            user: req.user.id,

        });

        res.status(201).json(goal);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// GET ALL
export const getGoals = async (req, res) => {

    try {

        const goals = await Goal.find({

            user: req.user.id,

        });

        res.json(goals);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// GET ONE
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

// UPDATE
export const updateGoal = async (req, res) => {

    try {

        const goal =
            await Goal.findOneAndUpdate(

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

// DELETE
export const deleteGoal = async (req, res) => {

    try {

        const goal =
            await Goal.findOneAndDelete({

                _id: req.params.id,

                user: req.user.id,

            });

        if (!goal) {

            return res.status(404).json({
                message: "Goal not found",
            });

        }

        res.json({
            message: "Goal deleted",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};