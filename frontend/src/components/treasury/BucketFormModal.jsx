import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createBucket } from "../../features/treasury/treasurySlice";

const BucketFormModal = ({
    isOpen,
    onClose,
}) => {

    const dispatch = useDispatch();

    const { family } = useSelector(
        (state) => state.family
    );

    const { treasury } = useSelector(
        (state) => state.treasury
    );

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        color: "#3B82F6",

        icon: "wallet",

        type: "Custom",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(

            createBucket({

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

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-lg">

                <h2 className="text-xl font-semibold mb-5">

                    Create Bucket

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="name"
                        placeholder="Bucket Name"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <select
                        name="type"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.type}
                        onChange={handleChange}
                    >

                        <option>Custom</option>

                        <option>Savings</option>

                        <option>Emergency</option>

                        <option>Investment</option>

                        <option>Insurance</option>

                        <option>Goal</option>

                        <option>Business</option>

                    </select>

                    <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >

                            Create

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default BucketFormModal;