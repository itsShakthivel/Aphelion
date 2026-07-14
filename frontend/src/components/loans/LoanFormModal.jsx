import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addLoan,
    editLoan,
} from "../../features/loan/loanSlice";

const LoanFormModal = ({
    open,
    onClose,
    mode = "add",
    loan = null,
}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        loanName: "",

        type: "home",

        lender: "",

        principalAmount: "",

        outstandingAmount: "",

        interestRate: "",

        emi: "",

        startDate: new Date().toISOString().split("T")[0],

        endDate: "",

        notes: "",

    });

    useEffect(() => {

        if (mode === "add" && open) {

            setFormData({

                loanName: "",

                type: "home",

                lender: "",

                principalAmount: "",

                outstandingAmount: "",

                interestRate: "",

                emi: "",

                startDate: new Date().toISOString().split("T")[0],

                endDate: "",

                notes: "",

            });

        }

    }, [open, mode]);

    useEffect(() => {

        if (mode === "edit" && loan) {

            setFormData({

                loanName: loan.loanName,

                type: loan.type,

                lender: loan.lender,

                principalAmount: loan.principalAmount,

                outstandingAmount: loan.outstandingAmount,

                interestRate: loan.interestRate,

                emi: loan.emi,

                startDate: loan.startDate?.split("T")[0],

                endDate: loan.endDate?.split("T")[0],

                notes: loan.notes || "",

            });

        }

    }, [mode, loan]);

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.loanName.trim()) {

            toast.error("Loan name is required");

            return;

        }

        if (!formData.lender.trim()) {

            toast.error("Lender is required");

            return;

        }

        if (!formData.principalAmount) {

            toast.error("Principal amount is required");

            return;

        }

        if (!formData.outstandingAmount) {

            toast.error("Outstanding amount is required");

            return;

        }

        if (!formData.interestRate) {

            toast.error("Interest rate is required");

            return;

        }

        if (!formData.emi) {

            toast.error("EMI is required");

            return;

        }

        if (!formData.endDate) {

            toast.error("End date is required");

            return;

        }

        try {

            if (mode === "add") {

                await dispatch(
                    addLoan(formData)
                ).unwrap();

                toast.success("Loan Added");

            } else {

                await dispatch(
                    editLoan({

                        id: loan._id,

                        data: formData,

                    })
                ).unwrap();

                toast.success("Loan Updated");

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

                        ? "Add Loan"

                        : "Edit Loan"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="loanName"
                        placeholder="Loan Name"
                        value={formData.loanName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="home">Home</option>

                        <option value="personal">Personal</option>

                        <option value="education">Education</option>

                        <option value="vehicle">Vehicle</option>

                        <option value="gold">Gold</option>

                        <option value="credit_card">Credit Card</option>

                        <option value="other">Other</option>

                    </select>

                    <input
                        type="text"
                        name="lender"
                        placeholder="Lender"
                        value={formData.lender}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="principalAmount"
                        placeholder="Principal Amount"
                        value={formData.principalAmount}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="outstandingAmount"
                        placeholder="Outstanding Amount"
                        value={formData.outstandingAmount}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="interestRate"
                        placeholder="Interest Rate (%)"
                        value={formData.interestRate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="emi"
                        placeholder="Monthly EMI"
                        value={formData.emi}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
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

export default LoanFormModal;