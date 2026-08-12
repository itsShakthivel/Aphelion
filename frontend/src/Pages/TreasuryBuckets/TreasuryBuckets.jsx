import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import DashboardLayout
    from "../layouts/DashboardLayout";

import TreasuryBucketTable
    from "../components/treasuryBuckets/TreasuryBucketTable";

import TreasuryBucketFormModal
    from "../components/treasuryBuckets/TreasuryBucketFormModal";

import {
    fetchTreasury,
} from "../features/treasury/treasurySlice";

import {
    fetchTreasuryBuckets,
} from "../features/treasuryBucket/treasuryBucketSlice";

const TreasuryBuckets = () => {

    const dispatch = useDispatch();

    const [
        openModal,
        setOpenModal,
    ] = useState(false);

    const { family } =
        useSelector(
            state => state.family
        );

    const { treasury } =
        useSelector(
            state => state.treasury
        );

    useEffect(() => {

        if (!family) return;

        dispatch(

            fetchTreasury(

                family._id

            )

        );

    }, [

        dispatch,

        family,

    ]);

    useEffect(() => {

        if (!treasury) return;

        dispatch(

            fetchTreasuryBuckets(

                treasury._id

            )

        );

    }, [

        dispatch,

        treasury,

    ]);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Treasury Buckets

                        </h1>

                        <p className="text-gray-500 mt-1">

                            Create and manage your household's custom allocation buckets.

                        </p>

                    </div>

                    <button

                        onClick={() =>
                            setOpenModal(true)
                        }

                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                    >

                        Add Bucket

                    </button>

                </div>

                <TreasuryBucketTable />

                <TreasuryBucketFormModal

                    isOpen={openModal}

                    onClose={() =>
                        setOpenModal(false)
                    }

                />

            </div>

        </DashboardLayout>

    );

};

export default TreasuryBuckets;