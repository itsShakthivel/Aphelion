import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import TreasuryRequestTable
    from "../../components/treasuryRequests/TreasuryRequestTable";

import TreasuryRequestFormModal
    from "../../components/treasuryRequests/TreasuryRequestFormModal";

import {
    fetchTreasury,
} from "../../features/treasury/treasurySlice";

import {
    fetchTreasuryRequests,
} from "../../features/treasuryRequest/treasuryRequestSlice";

const TreasuryRequests = () => {

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

            fetchTreasuryRequests(

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

                    <h1 className="text-3xl font-bold">

                        Treasury Requests

                    </h1>

                    <button

                        onClick={() =>
                            setOpenModal(true)
                        }

                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                    >

                        New Request

                    </button>

                </div>

                <TreasuryRequestTable />

                <TreasuryRequestFormModal

                    isOpen={openModal}

                    onClose={() =>
                        setOpenModal(false)
                    }

                />

            </div>

        </DashboardLayout>

    );

};

export default TreasuryRequests;