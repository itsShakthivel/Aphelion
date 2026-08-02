import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createContribution,
} from "../../features/treasury/contributionSlice";

const ContributionFormModal = ({
    isOpen,
    onClose,
}) => {

    const dispatch = useDispatch();

    const { family } = useSelector(
        (state) => state.family
    );

    const { treasury, buckets } =
        useSelector(
            (state) => state.treasury
        );

    const [formData, setFormData] =
        useState({

            contributor: "",

            managedMember: "",

            bucket: "",

            amount: "",

            category: "",

            notes: "",

            recurring: false,

        });

    const handleChange = (e) => {

        const {

            name,

            value,

            type,

            checked,

        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(

            createContribution({

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

                <h2 className="text-xl font-semibold mb-5">

                    Add Contribution

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <select
                        name="bucket"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.bucket}
                        onChange={handleChange}
                    >

                        <option value="">

                            Available Balance

                        </option>

                        {

                            buckets.map(
                                (bucket) => (

                                    <option
                                        key={bucket._id}
                                        value={bucket._id}
                                    >

                                        {bucket.name}

                                    </option>

                                )
                            )

                        }

                    </select>

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        className="w-full border rounded-lg px-3 py-2"
                        value={formData.notes}
                        onChange={handleChange}
                    />

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            name="recurring"
                            checked={
                                formData.recurring
                            }
                            onChange={handleChange}
                        />

                        Recurring Contribution

                    </label>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border rounded-lg px-4 py-2"
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

export default ContributionFormModal;