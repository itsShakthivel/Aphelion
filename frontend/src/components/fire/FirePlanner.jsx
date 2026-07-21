import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFIREPlanner } from "../../features/fire/fireSlice";

import FireTargetCard from "./FireTargetCard";
import FireProgressRing from "./FireProgressRing";
import FireStatsGrid from "./FireStatsGrid";
import FireInputPanel from "./FireInputPanel";
import FireTimeline from "./FireTimeline";
import FireTimelineSummary from "./FireTimelineSummary";
import FireSimulator from "./FireSimulator";
import FireRecommendations from "./FireRecommendations";

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

            <FireTimelineSummary
                planner={planner}
            />

            <FireTimeline
                timeline={planner?.timeline}
            />

            <FireSimulator
                planner={planner}
            />

            <FireRecommendations
                recommendations={planner?.recommendations}
            />

        </section>

        

    );

};

export default FIREPlanner;