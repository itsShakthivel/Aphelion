import Transaction from "../models/Transaction";

//Create
export const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create({
            user: req.user.id,
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            description: req.body.description,
            date: req.body.date,
        });

        res
            .status(201)
            .json(transaction);

    } catch (error) {
        res
            .status(201)
            .json({
                message: error.message,
            });
    }
};

//GET All

export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.find({
            user: req.user.id
        })
        .populate(
            "category"
        )
        .sort({
            date: -1
        });

        res.json(
            transaction
        );

    } catch (error) {
        res
            .status(500)
            .json({
                message: error.message,
            });
    }
};

//GET One

export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction
                                .findById(
                                    req.params.id
                                )
                                .populate(
                                    "category"
                                );
        res.json(
            transaction
        );

    } catch(error) {
        res
            .status(500)
            .json({
                message: error.message,
            });
    }
};

//UPDATE

export const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction
                                .findByIdAndUpdate(
                                    req.params.id,
                                    req.body,
                                    {
                                        new: true
                                    }
                                );
            
        res.json(
            transaction
        );
    } catch (error) {
        res
            .status(500)
            .json({
                message: error.message,
            });
    }
};

//DELETE

export const deleteTransaction = async (req, res) => {
    try {
        await Transaction
            .findByIdAndDelete(
                req.params.id
            );

        res.json({
            message: "Transaction deleted",
        });
        
    } catch (error) {
        res
            .status(500)
            .json({
                message: error.message,
            });
    }
};