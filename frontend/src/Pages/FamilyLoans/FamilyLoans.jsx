import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";

import FamilyLoanTable from "../components/familyLoans/FamilyLoanTable";
import FamilyLoanFormModal from "../components/familyLoans/FamilyLoanFormModal";

import {
    fetchTreasury,
} from "../features/treasury/treasurySlice";

import {
    fetchFamilyLoans,
} from "../features/familyLoan/familyLoanSlice";

const FamilyLoans = () => {

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
            fetchFamilyLoans(
                treasury._id
            )
        );

    }, [dispatch, treasury]);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold">

                        Family Loans

                    </h1>

                    <button

                        onClick={() =>
                            setOpenModal(true)
                        }

                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                    >

                        Add Loan

                    </button>

                </div>

                <FamilyLoanTable />

                <FamilyLoanFormModal

                    isOpen={openModal}

                    onClose={() =>
                        setOpenModal(false)
                    }

                />

            </div>

        </DashboardLayout>

    );

};

export default FamilyLoans;