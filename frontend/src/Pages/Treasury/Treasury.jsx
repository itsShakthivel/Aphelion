import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";

import TreasurySummaryCards from "../components/treasury/TreasurySummaryCards";
import BucketList from "../components/treasury/BucketList";
import ContributionTable from "../components/treasury/ContributionTable";

import {
    fetchTreasury,
    fetchBuckets,
} from "../features/treasury/treasurySlice";

import {
    fetchContributions,
} from "../features/treasury/contributionSlice";

const Treasury = () => {

    const dispatch = useDispatch();

    const { family } = useSelector(
        (state) => state.family
    );

    const { treasury } = useSelector(
        (state) => state.treasury
    );

    useEffect(() => {

        if (!family) return;

        dispatch(
            fetchTreasury(
                family._id
            )
        );

    }, [family, dispatch]);

    useEffect(() => {

        if (!treasury) return;

        dispatch(
            fetchBuckets(
                treasury._id
            )
        );

        dispatch(
            fetchContributions(
                treasury._id
            )
        );

    }, [treasury, dispatch]);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <TreasurySummaryCards />

                <BucketList />

                <ContributionTable />

            </div>

        </DashboardLayout>

    );

};

export default Treasury;