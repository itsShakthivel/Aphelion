import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addInsurance,
    editInsurance,
} from "../../features/insurance/insuranceSlice";

const InsuranceFormModal = ({
    open,
    onClose,
    mode = "add",
    insurance = null,
}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({

        policyName: "",

        type: "health",

        provider: "",

        premium: "",

        coverage: "",

        startDate: new Date().toISOString().split("T")[0],

        expiryDate: "",

        notes: "",

    });

    useEffect(() => {

        if (mode === "add" && open) {

            setFormData({

                policyName: "",

                type: "health",

                provider: "",

                premium: "",

                coverage: "",

                startDate: new Date().toISOString().split("T")[0],

                expiryDate: "",

                notes: "",

            });

        }

    }, [open, mode]);

    useEffect(() => {

        if (mode === "edit" && insurance) {

            setFormData({

                policyName: insurance.policyName,

                type: insurance.type,

                provider: insurance.provider,

                premium: insurance.premium,

                coverage: insurance.coverage,

                startDate:
                    insurance.startDate?.split("T")[0],

                expiryDate:
                    insurance.expiryDate?.split("T")[0],

                notes:
                    insurance.notes || "",

            });

        }

    }, [mode, insurance]);

    if (!open) return null;

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.policyName.trim()) {

            toast.error("Policy name is required");

            return;

        }

        if (!formData.provider.trim()) {

            toast.error("Provider is required");

            return;

        }

        if (!formData.premium) {

            toast.error("Premium is required");

            return;

        }

        if (!formData.coverage) {

            toast.error("Coverage is required");

            return;

        }

        if (!formData.expiryDate) {

            toast.error("Expiry date is required");

            return;

        }

        try {

            if (mode === "add") {

                await dispatch(

                    addInsurance(formData)

                ).unwrap();

                toast.success("Insurance Added");

            } else {

                await dispatch(

                    editInsurance({

                        id: insurance._id,

                        data: formData,

                    })

                ).unwrap();

                toast.success("Insurance Updated");

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

                        ? "Add Insurance"

                        : "Edit Insurance"}

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="policyName"
                        placeholder="Policy Name"
                        value={formData.policyName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="health">
                            Health
                        </option>

                        <option value="term">
                            Term
                        </option>

                        <option value="vehicle">
                            Vehicle
                        </option>

                        <option value="home">
                            Home
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                    <input
                        type="text"
                        name="provider"
                        placeholder="Provider"
                        value={formData.provider}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="premium"
                        placeholder="Premium"
                        value={formData.premium}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="coverage"
                        placeholder="Coverage"
                        value={formData.coverage}
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
                        name="expiryDate"
                        value={formData.expiryDate}
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

export default InsuranceFormModal;