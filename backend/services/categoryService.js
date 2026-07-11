import Category from "../models/Category.js";
import defaultCategories from "../utils/defaultCategories.js";

export const createDefaultCategories = async (userId) => {

    const categories = defaultCategories.map((category) => ({

        ...category,

        user: userId,

    }));

    await Category.insertMany(categories);

};