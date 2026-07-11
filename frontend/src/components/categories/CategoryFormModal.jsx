import { useEffect, useState } from "react";
import {
    useDispatch,
} from "react-redux";

import {
    addCategory,
    editCategory,
} from "../../features/category/categorySlice";

const CategoryFormModal = ({
    open,
    onClose,
    mode,
    category,
}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        name: "",

        type: "expense",

        group: "General",

        color: "#10B981",

        icon: "💰",

    });

    useEffect(() => {

        if (mode === "edit" && category) {

            setFormData({

                name: category.name,

                type: category.type,

                group: category.group,

                color: category.color,

                icon: category.icon,

            });

        } else {

            setFormData({

                name: "",

                type: "expense",

                group: "General",

                color: "#10B981",

                icon: "💰",

            });

        }

    }, [mode, category]);

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (mode === "add") {

            dispatch(addCategory(formData));

        } else {

            dispatch(editCategory({

                id: category._id,

                data: formData,

            }));

        }

        onClose();

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

                <h2 className="text-2xl font-bold mb-6">

                    {mode === "add"

                        ? "Add Category"

                        : "Edit Category"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input

                        name="name"

                        placeholder="Category Name"

                        value={formData.name}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                        required

                    />

                    <select

                        name="type"

                        value={formData.type}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    >

                        <option value="expense">
                            Expense
                        </option>

                        <option value="income">
                            Income
                        </option>

                        <option value="investment">
                            Investment
                        </option>

                        <option value="saving">
                            Saving
                        </option>

                    </select>

                    <input

                        name="group"

                        placeholder="Group"

                        value={formData.group}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    />

                    <div className="flex gap-4">

                        <input

                            type="color"

                            name="color"

                            value={formData.color}

                            onChange={handleChange}

                            className="w-20 h-12"

                        />

                        <input

                            name="icon"

                            placeholder="Emoji"

                            value={formData.icon}

                            onChange={handleChange}

                            className="flex-1 border rounded-lg p-3"

                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="px-5 py-2 rounded-lg border"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="bg-emerald-500 text-white px-5 py-2 rounded-lg"

                        >

                            {mode === "add"

                                ? "Add"

                                : "Update"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CategoryFormModal;