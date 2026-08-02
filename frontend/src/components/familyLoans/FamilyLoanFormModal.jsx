import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    createFamilyLoan,
} from "../../features/familyLoan/familyLoanSlice";

const FamilyLoanFormModal = ({

    isOpen,

    onClose,

}) => {

    const dispatch = useDispatch();

    const { family } = useSelector(
        state => state.family
    );

    const { treasury } = useSelector(
        state => state.treasury
    );

    const [formData, setFormData] =
        useState({

            loanName: "",

            loanType: "Bank",

            originalAmount: "",

            interestRate: "",

            emi: "",

            tenure: "",

            creditor: "",

            notes: "",

        });

    const handleChange = e => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleSubmit = e => {

        e.preventDefault();

        dispatch(

            createFamilyLoan({

                familyId:
                    family._id,

                treasuryId:
                    treasury._id,

                data: formData,

            })

        );

        onClose();

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-xl">

                <h2 className="text-xl font-bold mb-6">

                    Add Family Loan

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="loanName"
                        placeholder="Loan Name"
                        className="w-full border rounded-lg p-3"
                        value={formData.loanName}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="loanType"
                        className="w-full border rounded-lg p-3"
                        value={formData.loanType}
                        onChange={handleChange}
                    >

                        <option value="Bank">

                            Bank Loan

                        </option>

                        <option value="Manual">

                            Manual Debt

                        </option>

                    </select>

                    <input
                        type="number"
                        name="originalAmount"
                        placeholder="Original Amount"
                        className="w-full border rounded-lg p-3"
                        value={formData.originalAmount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="creditor"
                        placeholder="Creditor"
                        className="w-full border rounded-lg p-3"
                        value={formData.creditor}
                        onChange={handleChange}
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        className="w-full border rounded-lg p-3"
                        value={formData.notes}
                        onChange={handleChange}
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
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >

                            Save

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default FamilyLoanFormModal;