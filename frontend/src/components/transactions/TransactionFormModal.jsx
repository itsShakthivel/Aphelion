import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addTransaction,
    editTransaction,
} from "../../features/transaction/transactionSlice";
import { fetchCategories } from "../../features/category/categorySlice";

const TransactionFormModal = ({
    open,
    onClose,
    mode = "add",
    transaction = null,
}) => {

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.category
    );

    const [formData, setFormData] = useState({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if(categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    useEffect(() => {
        if(mode === "add" && open) {
            setFormData({
                amount: "",
                type: "expense",
                category: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
            });
        }
    }, [open, mode]);

    useEffect(() => {

        if (mode === "edit" && transaction) {

            setFormData({
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category?._id || "",
                description: transaction.description || "",
                date: transaction.date?.split("T")[0],
            });

        }

    }, [mode, transaction]);

    if (!open) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        if(name === "type")  {
            setFormData({
                ...formData,
                type: value,
                category: "",
            });

            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.amount) {

            toast.error("Amount is required");

            return;

        }

        if(!formData.category) {
            toast.error("Please select a category");
            return;
        }

        if(!formData.description.trim()) {
            toast.error("Description is required");
            return;
        }

        try {

            if (mode === "add") {

                await dispatch(
                    addTransaction(formData)
                ).unwrap();

                toast.success("Transaction Added");

            } else {

                await dispatch(
                    editTransaction({
                        id: transaction._id,
                        data: formData,
                    })
                ).unwrap();

                toast.success("Transaction Updated");

            }

            onClose();

        } catch (error) {

            toast.error(error);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

                <h2 className="text-2xl font-bold mb-6">

                    {mode === "add"
                        ? "Add Transaction"
                        : "Edit Transaction"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* Amount */}

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    {/* Type */}

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="income">
                            Income
                        </option>

                        <option value="expense">
                            Expense
                        </option>

                        <option value="saving">
                            Saving
                        </option>

                        <option value="investment">
                            Investment
                        </option>

                    </select>

                    {/* Category */}

                    <select
                        name="category"
                        value={form.Data.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categories.filter(
                            (category) =>
                                category.type === form.Data.type
                        ).map((category) => (
                            <option 
                            key={category._id}
                            value={category._id}>
                                {category.icon} {category.name}
                            </option>
                        ))
                        }

                    </select>

                    {/* Description */}

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    {/* Date */}

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
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

export default TransactionFormModal;