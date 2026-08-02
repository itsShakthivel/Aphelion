import { useState } from "react";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import {

    createFamilyTransaction,

} from "../../features/familyTransaction/familyTransactionSlice";

const FamilyTransactionFormModal = ({

    isOpen,

    onClose,

}) => {

    const dispatch = useDispatch();

    const { family } = useSelector(

        state => state.family

    );

    const { treasury, buckets } =

        useSelector(

            state => state.treasury

        );

    const [formData, setFormData] =

        useState({

            amount: "",

            category: "",

            description: "",

            type: "Expense",

            bucket: "",

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

            createFamilyTransaction({

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

                    Add Family Transaction

                </h2>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >

                    <input

                        type="number"

                        name="amount"

                        placeholder="Amount"

                        className="w-full border rounded-lg p-3"

                        value={formData.amount}

                        onChange={handleChange}

                        required

                    />

                    <input

                        name="category"

                        placeholder="Category"

                        className="w-full border rounded-lg p-3"

                        value={formData.category}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="type"

                        value={formData.type}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    >

                        <option value="Expense">

                            Expense

                        </option>

                        <option value="Income">

                            Income

                        </option>

                    </select>

                    <select

                        name="bucket"

                        value={formData.bucket}

                        onChange={handleChange}

                        className="w-full border rounded-lg p-3"

                    >

                        <option value="">

                            Available Balance

                        </option>

                        {

                            buckets.map(

                                bucket => (

                                    <option

                                        key={bucket._id}

                                        value={bucket._id}

                                    >

                                        {

                                            bucket.name

                                        }

                                    </option>

                                )

                            )

                        }

                    </select>

                    <textarea

                        name="description"

                        placeholder="Description"

                        className="w-full border rounded-lg p-3"

                        value={formData.description}

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

export default FamilyTransactionFormModal;