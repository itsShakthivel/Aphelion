import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import FamilyGoalTable
    from "../../components/familyGoals/FamilyGoalTable";

import FamilyGoalFormModal
    from "../../components/familyGoals/FamilyGoalFormModal";

import {
    fetchTreasury,
} from "../../features/treasury/treasurySlice";

import {
    fetchFamilyGoals,
} from "../../features/familyGoal/familyGoalSlice";

const FamilyGoals = () => {

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

            fetchFamilyGoals(

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

                {/* Header */}

                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold">

                        Family Goals

                    </h1>

                    <button

                        onClick={() =>
                            setOpenModal(true)
                        }

                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                    >

                        Add Goal

                    </button>

                </div>

                {/* Goals */}

                <FamilyGoalTable />

                {/* Form */}

                <FamilyGoalFormModal

                    isOpen={openModal}

                    onClose={() =>
                        setOpenModal(false)
                    }

                />

            </div>

        </DashboardLayout>

    );

};

export default FamilyGoals;