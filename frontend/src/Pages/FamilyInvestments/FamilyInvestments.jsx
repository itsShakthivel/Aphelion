import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import FamilyInvestmentTable from "../../components/familyInvestments/FamilyInvestmentTable";
import FamilyInvestmentFormModal from "../../components/familyInvestments/FamilyInvestmentFormModal";

import { fetchTreasury } from "../../features/treasury/treasurySlice";
import { fetchFamilyInvestments } from "../../features/familyInvestment/familyInvestmentSlice";

const FamilyInvestments = () => {

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    const { family } = useSelector(
        state => state.family
    );

    const { treasury } = useSelector(
        state => state.treasury
    );

    useEffect(() => {

        if (!family) return;

        dispatch(fetchTreasury(family._id));

    }, [dispatch, family]);

    useEffect(() => {

        if (!treasury) return;

        dispatch(fetchFamilyInvestments(treasury._id));

    }, [dispatch, treasury]);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-bold">

                        Family Investments

                    </h1>

                    <button

                        onClick={() => setOpenModal(true)}

                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                    >

                        Add Investment

                    </button>

                </div>

                <FamilyInvestmentTable />

                <FamilyInvestmentFormModal

                    isOpen={openModal}

                    onClose={() => setOpenModal(false)}

                />

            </div>

        </DashboardLayout>

    );

};

export default FamilyInvestments;