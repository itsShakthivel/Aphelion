import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFIREPlanner } from "../../features/fire/fireSlice";

import FireTargetCard from "./FireTargetCard";
import FireProgressRing from "./FireProgressRing";
import FireStatsGrid from "./FireStatsGrid";
import FireInputPanel from "./FireInputPanel";

const FIREPlanner = () => {

    const dispatch = useDispatch();

    const {

        planner,

        loading,

        error,

    } = useSelector((state) => state.fire);

    useEffect(() => {

        dispatch(fetchFIREPlanner());

    }, [dispatch]);

    const handleApply = (values) => {
        dispatch(fetchFIREPlanner(values));
    };

    if (loading) {

        return <div>Loading FIRE Planner...</div>;

    }

    if (error) {

        return <div className="text-red-500">{error}</div>;

    }

    return (

        <section className="space-y-8">

            <FireTargetCard planner={planner} />

            <FireProgressRing
                progress={planner?.progress || 0}
            />

            <FireStatsGrid planner={planner} />

            <FireInputPanel
                planner={planner}
                onApply={handleApply}
            />

        </section>

        

    );

};

export default FIREPlanner;