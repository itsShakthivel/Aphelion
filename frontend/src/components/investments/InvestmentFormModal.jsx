import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addInvestment,
    editInvestment,
} from "../../features/investment/investmentSlice";

const InvestmentFormModal = ({
    open,
    onClose,
    mode = "add",
    investment = null,
}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        name: "",

        type: "mutual_fund",

        investedAmount: "",

        currentValue: "",

        purchaseDate: new Date().toISOString().split("T")[0],

        notes: "",

    });

    useEffect(() => {

        if (mode === "add" && open) {

            setFormData({

                name: "",

                type: "mutual_fund",

                investedAmount: "",

                currentValue: "",

                purchaseDate: new Date().toISOString().split("T")[0],

                notes: "",

            });

        }

    }, [open, mode]);

    useEffect(() => {

        if (mode === "edit" && investment) {

            setFormData({

                name: investment.name,

                type: investment.type,

                investedAmount: investment.investedAmount,

                currentValue: investment.currentValue,

                purchaseDate:
                    investment.purchaseDate?.split("T")[0],

                notes: investment.notes || "",

            });

        }

    }, [mode, investment]);

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {

            toast.error("Investment name is required");

            return;

        }

        if (!formData.investedAmount) {

            toast.error("Invested amount is required");

            return;

        }

        if (!formData.currentValue) {

            toast.error("Current value is required");

            return;

        }

        try {

            if (mode === "add") {

                await dispatch(

                    addInvestment(formData)

                ).unwrap();

                toast.success("Investment Added");

            } else {

                await dispatch(

                    editInvestment({

                        id: investment._id,

                        data: formData,

                    })

                ).unwrap();

                toast.success("Investment Updated");

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

                        ? "Add Investment"

                        : "Edit Investment"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Investment Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="mutual_fund">
                            Mutual Fund
                        </option>

                        <option value="stock">
                            Stock
                        </option>

                        <option value="gold">
                            Gold
                        </option>

                        <option value="crypto">
                            Crypto
                        </option>

                        <option value="fd">
                            Fixed Deposit
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="investedAmount"
                        placeholder="Invested Amount"
                        value={formData.investedAmount}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        name="currentValue"
                        placeholder="Current Value"
                        value={formData.currentValue}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
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
                            className="px-5 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-emerald-500 text-white"
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

export default InvestmentFormModal;