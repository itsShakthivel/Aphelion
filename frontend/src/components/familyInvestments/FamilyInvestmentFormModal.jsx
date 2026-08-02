import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {

    createFamilyInvestment,

} from "../../features/familyInvestment/familyInvestmentSlice";

const FamilyInvestmentFormModal = ({

    isOpen,

    onClose,

}) => {

    const dispatch = useDispatch();

    const { family } = useSelector(
        state => state.family
    );

    const { treasury, buckets } = useSelector(
        state => state.treasury
    );

    const [formData, setFormData] =
        useState({

            investmentName: "",

            investmentType: "Mutual Fund",

            investedAmount: "",

            bucket: "",

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

            createFamilyInvestment({

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

                    Add Family Investment

                </h2>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >

                    <input

                        name="investmentName"

                        placeholder="Investment Name"

                        className="w-full border rounded-lg p-3"

                        value={formData.investmentName}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="investmentType"

                        className="w-full border rounded-lg p-3"

                        value={formData.investmentType}

                        onChange={handleChange}

                    >

                        <option>Mutual Fund</option>

                        <option>Stocks</option>

                        <option>ETF</option>

                        <option>Gold</option>

                        <option>FD</option>

                        <option>Bond</option>

                        <option>Crypto</option>

                        <option>Real Estate</option>

                        <option>Other</option>

                    </select>

                    <input

                        type="number"

                        name="investedAmount"

                        placeholder="Investment Amount"

                        className="w-full border rounded-lg p-3"

                        value={formData.investedAmount}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="bucket"

                        className="w-full border rounded-lg p-3"

                        value={formData.bucket}

                        onChange={handleChange}

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

export default FamilyInvestmentFormModal;