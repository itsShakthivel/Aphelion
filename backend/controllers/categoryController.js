import Category from "../models/Category";

//Create
export const createCategory = async (req, res) => {
    try{
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

//Update
export const updateCategory = async (req, res) => {
    try{
        const category = 
            await Category.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true}
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
        await Category.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Category deleted",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};