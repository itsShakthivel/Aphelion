import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";

import FamilyTransactionTable from "../components/familyTransactions/FamilyTransactionTable";
import FamilyTransactionFormModal from "../components/familyTransactions/FamilyTransactionFormModal";

import {
    fetchTreasury,
} from "../features/treasury/treasurySlice";

import {
    fetchFamilyTransactions,
} from "../features/familyTransaction/familyTransactionSlice";

const FamilyTransactions = () => {

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

    }, [

        dispatch,

        family,

    ]);

    useEffect(() => {

        if (!treasury) return;

        dispatch(

            fetchFamilyTransactions(

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

                        Family Transactions

                    </h1>

                    <button

                        onClick={() =>

                            setOpenModal(true)

                        }

                        className="px-5 py-2 bg-blue-600 text-white rounded-lg"

                    >

                        Add Transaction

                    </button>

                </div>

                <FamilyTransactionTable />

                <FamilyTransactionFormModal

                    isOpen={openModal}

                    onClose={() =>
                        setOpenModal(false)
                    }

                />

            </div>

        </DashboardLayout>

    );

};

export default FamilyTransactions;