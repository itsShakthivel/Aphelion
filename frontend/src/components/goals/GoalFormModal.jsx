import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addGoal,
    editGoal,
} from "../../features/goal/goalSlice";

const GoalFormModal = ({
    open,
    onClose,
    mode = "add",
    goal = null,
}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        title: "",

        category: "other",

        targetAmount: "",

        currentAmount: "",

        targetDate: "",

        notes: "",

    });

    useEffect(() => {

        if (mode === "add" && open) {

            setFormData({

                title: "",

                category: "other",

                targetAmount: "",

                currentAmount: "",

                targetDate: "",

                notes: "",

            });

        }

    }, [open, mode]);

    useEffect(() => {

        if (mode === "edit" && goal) {

            setFormData({

                title: goal.title,

                category: goal.category,

                targetAmount: goal.targetAmount,

                currentAmount: goal.currentAmount,

                targetDate: goal.targetDate?.split("T")[0],

                notes: goal.notes || "",

            });

        }

    }, [mode, goal]);

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title.trim()) {

            toast.error("Goal title is required");

            return;

        }

        if (!formData.targetAmount) {

            toast.error("Target amount is required");

            return;

        }

        if (!formData.targetDate) {

            toast.error("Target date is required");

            return;

        }

        try {

            if (mode === "add") {

                await dispatch(
                    addGoal(formData)
                ).unwrap();

                toast.success("Goal Added");

            } else {

                await dispatch(
                    editGoal({

                        id: goal._id,

                        data: formData,

                    })
                ).unwrap();

                toast.success("Goal Updated");

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

                        ? "Add Goal"

                        : "Edit Goal"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Goal Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="emergency">Emergency</option>
                        <option value="house">House</option>
                        <option value="car">Car</option>
                        <option value="vacation">Vacation</option>
                        <option value="education">Education</option>
                        <option value="retirement">Retirement</option>
                        <option value="investment">Investment</option>
                        <option value="other">Other</option>

                    </select>

                    <input
                        type="number"
                        name="targetAmount"
                        placeholder="Target Amount"
                        value={formData.targetAmount}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="currentAmount"
                        placeholder="Current Amount"
                        value={formData.currentAmount}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="date"
                        name="targetDate"
                        value={formData.targetDate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-5 py-2 rounded-lg"
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

export default GoalFormModal;