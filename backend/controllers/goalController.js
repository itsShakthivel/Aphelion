import Goal from "../models/Goal.js";
import { generateNotification } from "../services/notification/notificationGenerator.service.js";

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

        await generateNotification({

            user: req.user.id,

            title: "New Goal Created",

            message: `Goal "${goal.title}" has been created successfully.`,

            type: "Goal",

            priority: "Info",

            action: "View Goal",

            link: "/goals",

            payload: {

                goalId: goal._id,

            },

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

        const goal = await Goal.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!goal) {

            return res.status(404).json({

                message: "Goal not found",

            });

        }

        // ----------------------------
        // Store previous progress
        // ----------------------------

        const previousAmount =
            goal.currentAmount;

        // ----------------------------
        // Update Goal
        // ----------------------------

        Object.assign(goal, req.body);

        await goal.save();

        // ----------------------------
        // Goal Achieved Notification
        // ----------------------------

        const previousPercentage =

            (previousAmount / goal.targetAmount) * 100;

        const currentPercentage =

            (goal.currentAmount / goal.targetAmount) * 100;

        if (

            previousPercentage < 100 &&

            currentPercentage >= 100

        ) {

            await generateNotification({

                user: req.user.id,

                title: "Goal Achieved 🎉",

                message: `Congratulations! "${goal.title}" has been completed.`,

                type: "Goal",

                priority: "High",

                action: "View Goal",

                link: "/goals",

                payload: {

                    goalId: goal._id,

                },

            });

        }

        res.json(goal);

    }

    catch (error) {

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