import { useMemo, useState } from "react";

import InsightCard from "./InsightCard";
import InsightFilterTabs from "./InsightFilterTabs";
import EmptyInsights from "./EmptyInsights";

const InsightsSection = ({ insights = [] }) => {

    const [activeFilter, setActiveFilter] = useState("all");

    const filteredInsights = useMemo(() => {

        if (activeFilter === "all") {
            return insights;
        }

        return insights.filter(
            insight => insight.category === activeFilter
        );

    }, [activeFilter, insights]);

    return (

        <section className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold text-white">

                    Smart Financial Insights

                </h2>

                <p className="mt-1 text-zinc-400">

                    Personalized recommendations based on your financial activity.

                </p>

            </div>

            <InsightFilterTabs
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <div className="space-y-5">

                {filteredInsights.length === 0 ? (

                    <EmptyInsights />

                ) : (

                    filteredInsights.map((insight) => (

                        <InsightCard
                            key={insight.id}
                            insight={insight}
                        />

                    ))

                )}

            </div>

        </section>

    );

};

export default InsightsSection;