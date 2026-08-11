import { useState } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    createFamilyGoal,
} from "../../features/familyGoal/familyGoalSlice";

const FamilyGoalFormModal = ({

    isOpen,

    onClose,

}) => {

    const dispatch = useDispatch();

    const { family } =
        useSelector(
            state => state.family
        );

    const {
        treasury,
        buckets,
    } = useSelector(
        state => state.treasury
    );

    const [
        formData,
        setFormData,
    ] = useState({

        name: "",

        description: "",

        targetAmount: "",

        targetDate: "",

        category: "Other",

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

            createFamilyGoal({

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

                    Add Family Goal

                </h2>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >

                    <input

                        name="name"

                        placeholder="Goal Name"

                        className="w-full border rounded-lg p-3"

                        value={formData.name}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        name="description"

                        placeholder="Description"

                        className="w-full border rounded-lg p-3"

                        value={formData.description}

                        onChange={handleChange}

                    />

                    <input

                        type="number"

                        name="targetAmount"

                        placeholder="Target Amount"

                        min="0"

                        className="w-full border rounded-lg p-3"

                        value={formData.targetAmount}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="date"

                        name="targetDate"

                        className="w-full border rounded-lg p-3"

                        value={formData.targetDate}

                        onChange={handleChange}

                    />

                    <select

                        name="category"

                        className="w-full border rounded-lg p-3"

                        value={formData.category}

                        onChange={handleChange}

                    >

                        <option value="Vacation">

                            Vacation

                        </option>

                        <option value="Education">

                            Education

                        </option>

                        <option value="Wedding">

                            Wedding

                        </option>

                        <option value="Home">

                            Home

                        </option>

                        <option value="Vehicle">

                            Vehicle

                        </option>

                        <option value="Emergency">

                            Emergency

                        </option>

                        <option value="Purchase">

                            Purchase

                        </option>

                        <option value="Other">

                            Other

                        </option>

                    </select>

                    <select

                        name="bucket"

                        className="w-full border rounded-lg p-3"

                        value={formData.bucket}

                        onChange={handleChange}

                    >

                        <option value="">

                            Treasury

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

export default FamilyGoalFormModal;