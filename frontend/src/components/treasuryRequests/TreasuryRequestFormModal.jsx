import {
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    createTreasuryRequest,
} from "../../features/treasuryRequest/treasuryRequestSlice";

const TreasuryRequestFormModal = ({

    isOpen,

    onClose,

}) => {

    const dispatch = useDispatch();

    const { family } =
        useSelector(
            state => state.family
        );

    const { treasury } =
        useSelector(
            state => state.treasury
        );

    const [
        formData,
        setFormData,
    ] = useState({

        amount: "",

        purpose: "",

        category: "Other",

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

        if (!family || !treasury) return;

        dispatch(

            createTreasuryRequest({

                familyId:
                    family._id,

                treasuryId:
                    treasury._id,

                data: {

                    amount:
                        Number(
                            formData.amount
                        ),

                    purpose:
                        formData.purpose,

                    category:
                        formData.category,

                    notes:
                        formData.notes,

                },

            })

        );

        setFormData({

            amount: "",

            purpose: "",

            category: "Other",

            notes: "",

        });

        onClose();

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-xl">

                <h2 className="text-xl font-bold mb-6">

                    New Treasury Request

                </h2>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >

                    <input

                        type="number"

                        name="amount"

                        placeholder="Requested Amount"

                        min="0"

                        className="w-full border rounded-lg p-3"

                        value={formData.amount}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="purpose"

                        placeholder="Purpose"

                        maxLength="300"

                        className="w-full border rounded-lg p-3"

                        value={formData.purpose}

                        onChange={handleChange}

                        required

                    />

                    <select

                        name="category"

                        className="w-full border rounded-lg p-3"

                        value={formData.category}

                        onChange={handleChange}

                    >

                        <option value="Other">

                            Other

                        </option>

                        <option value="Home">

                            Home

                        </option>

                        <option value="Education">

                            Education

                        </option>

                        <option value="Vehicle">

                            Vehicle

                        </option>

                        <option value="Medical">

                            Medical

                        </option>

                        <option value="Travel">

                            Travel

                        </option>

                        <option value="Purchase">

                            Purchase

                        </option>

                    </select>

                    <textarea

                        name="notes"

                        placeholder="Notes"

                        maxLength="500"

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

                            Submit Request

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default TreasuryRequestFormModal;