import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createFamilyInsurance,
} from "../../features/familyInsurance/familyInsuranceSlice";

const FamilyInsuranceFormModal = ({
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

            policyName: "",

            provider: "",

            insuranceType: "Health",

            premiumAmount: "",

            coverageAmount: "",

            renewalDate: "",

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

            createFamilyInsurance({

                familyId: family._id,

                treasuryId: treasury._id,

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

                    Add Insurance Policy

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="policyName"
                        placeholder="Policy Name"
                        className="w-full border rounded-lg p-3"
                        value={formData.policyName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="provider"
                        placeholder="Insurance Provider"
                        className="w-full border rounded-lg p-3"
                        value={formData.provider}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="insuranceType"
                        className="w-full border rounded-lg p-3"
                        value={formData.insuranceType}
                        onChange={handleChange}
                    >

                        <option>Health</option>
                        <option>Life</option>
                        <option>Vehicle</option>
                        <option>Home</option>
                        <option>Travel</option>
                        <option>Business</option>
                        <option>Other</option>

                    </select>

                    <input
                        type="number"
                        name="premiumAmount"
                        placeholder="Premium Amount"
                        className="w-full border rounded-lg p-3"
                        value={formData.premiumAmount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="coverageAmount"
                        placeholder="Coverage Amount"
                        className="w-full border rounded-lg p-3"
                        value={formData.coverageAmount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="renewalDate"
                        className="w-full border rounded-lg p-3"
                        value={formData.renewalDate}
                        onChange={handleChange}
                        required
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
                            className="border rounded-lg px-5 py-2"
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

export default FamilyInsuranceFormModal;