import {
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    createTreasuryBucket,
} from "../../features/treasuryBucket/treasuryBucketSlice";

const TreasuryBucketFormModal = ({

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

        name: "",

        description: "",

        color: "",

        icon: "",

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

            createTreasuryBucket({

                familyId:
                    family._id,

                treasuryId:
                    treasury._id,

                data: {

                    name:
                        formData.name,

                    description:
                        formData.description,

                    color:
                        formData.color,

                    icon:
                        formData.icon,

                },

            })

        );

        setFormData({

            name: "",

            description: "",

            color: "",

            icon: "",

        });

        onClose();

    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-xl">

                <h2 className="text-xl font-bold mb-6">

                    Create Treasury Bucket

                </h2>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >

                    <input

                        type="text"

                        name="name"

                        placeholder="Bucket Name"

                        maxLength="100"

                        className="w-full border rounded-lg p-3"

                        value={formData.name}

                        onChange={handleChange}

                        required

                    />

                    <textarea

                        name="description"

                        placeholder="Description"

                        maxLength="300"

                        className="w-full border rounded-lg p-3"

                        value={formData.description}

                        onChange={handleChange}

                    />

                    <div>

                        <label className="block text-sm mb-2">

                            Bucket Color

                        </label>

                        <input

                            type="color"

                            name="color"

                            className="w-16 h-10 border rounded-lg cursor-pointer"

                            value={

                                formData.color ||

                                "#3b82f6"

                            }

                            onChange={handleChange}

                        />

                    </div>

                    <input

                        type="text"

                        name="icon"

                        placeholder="Icon"

                        className="w-full border rounded-lg p-3"

                        value={formData.icon}

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

                            Create Bucket

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default TreasuryBucketFormModal;