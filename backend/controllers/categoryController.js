import Category from "../models/Category.js";

//Create
export const createCategory = async (req, res) => {
    try{
        const existingCategory = await Category.findOne({
            user: req.user.id,
            name: req.body.name,
        });

        if(existingCategory) {
            return res.status(400).json({
                message: "Category already exists",
            });
        }

        const category = await Category.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//GET All
export const getCategories = async (req, res) => {
    try{
        const categories = await Category.find({
            user: req.user.id,
        });

        res.json(categories);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET SINGLE CATEGORY
export const getCategory = async (req, res) => {
    try {

        const category = await Category.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        res.json(category);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

//Update
export const updateCategory = async (req, res) => {
    try{
        const category = 
            await Category.findOneAndUpdate(
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
        
        res.json(category);

    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//Delete
export const deleteCategory = async (req, res) => {
    try{
        await Category.findOneAndDelete(
            {
                _id: req.params.id,
                user: req.user.id,
            }
        );

        if(!Category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        res.json({
            message: "Category deleted",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
