import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";

import FamilyInsuranceTable from "../components/familyInsurance/FamilyInsuranceTable";
import FamilyInsuranceFormModal from "../components/familyInsurance/FamilyInsuranceFormModal";

import {
    fetchTreasury,
} from "../features/treasury/treasurySlice";

import {
    fetchFamilyInsurancePolicies,
} from "../features/familyInsurance/familyInsuranceSlice";

const FamilyInsurance = () => {

    const dispatch = useDispatch();

    const [openModal, setOpenModal] =
        useState(false);

    const { family } = useSelector(
        state => state.family
    );

    const { treasury } = useSelector(
        state => state.treasury
    );

    useEffect(() => {

        if (!family) return;

        dispatch(
            fetchTreasury(
                family._id
            )
        );

    }, [dispatch, family]);

    useEffect(() => {

        if (!treasury) return;

        dispatch(
            fetchFamilyInsurancePolicies(
                treasury._id
            )
        );

    }, [dispatch, treasury]);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold">

                        Family Insurance

                    </h1>

                    <button

                        onClick={() =>
                            setOpenModal(true)
                        }

                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                    >

                        Add Policy

                    </button>

                </div>

                <FamilyInsuranceTable />

                <FamilyInsuranceFormModal

                    isOpen={openModal}

                    onClose={() =>
                        setOpenModal(false)
                    }

                />

            </div>

        </DashboardLayout>

    );

};

export default FamilyInsurance;