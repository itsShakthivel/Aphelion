import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { fetchRecommendations } from "../../features/recommendations/recommendationSlice";

import RecommendationSummary from "../../components/recommendations/RecommendationSummary";
import RecommendationFilters from "../../components/recommendations/RecommendationFilters";
import RecommendationGrid from "../../components/recommendations/RecommendationGrid";

const Recommendations = () => {

    const dispatch = useDispatch();

    const {
        recommendations,
        summary,
        loading,
        error,
    } = useSelector((state) => state.recommendations);

    // ===========================
    // Local State
    // ===========================

    const [category, setCategory] = useState("All");

    const [priority, setPriority] = useState("All");

    const [search, setSearch] = useState("");

    const [sort, setSort] = useState("priority");

    // ===========================
    // Fetch Recommendations
    // ===========================

    useEffect(() => {

        dispatch(fetchRecommendations());

    }, [dispatch]);

    // ===========================
    // Priority Order
    // ===========================

    const priorityOrder = {

        Critical: 1,

        High: 2,

        Medium: 3,

        Low: 4,

        Positive: 5,

    };

    // ===========================
    // Filter + Search + Sort
    // ===========================

    const filteredRecommendations = useMemo(() => {

        let filtered = recommendations.filter((item) => {

            const categoryMatch =
                category === "All" ||
                item.category === category;

            const priorityMatch =
                priority === "All" ||
                item.priority === priority;

            const searchMatch =
                item.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return (
                categoryMatch &&
                priorityMatch &&
                searchMatch
            );

        });

        switch (sort) {

            case "priority":

                filtered.sort(
                    (a, b) =>
                        priorityOrder[a.priority] -
                        priorityOrder[b.priority]
                );

                break;

            case "title":

                filtered.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );

                break;

            case "savings":

                filtered.sort(
                    (a, b) =>
                        b.estimatedSavings -
                        a.estimatedSavings
                );

                break;

            default:

                break;

        }

        return filtered;

    }, [
        recommendations,
        category,
        priority,
        search,
        sort,
    ]);

    // ===========================
    // Reset Filters
    // ===========================

    const resetFilters = () => {

        setCategory("All");

        setPriority("All");

        setSearch("");

        setSort("priority");

    };

    // ===========================
    // Loading
    // ===========================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[60vh]">

                    <p className="text-lg font-medium">

                        Loading Recommendations...

                    </p>

                </div>

            </DashboardLayout>

        );

    }

    // ===========================
    // Error
    // ===========================

    if (error) {

        return (

            <DashboardLayout>

                <div className="flex justify-center items-center h-[60vh]">

                    <p className="text-red-500 font-medium">

                        {error}

                    </p>

                </div>

            </DashboardLayout>

        );

    }

    // ===========================
    // UI
    // ===========================

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <RecommendationSummary
                    summary={summary}
                />

                <RecommendationFilters

                    category={category}
                    setCategory={setCategory}

                    priority={priority}
                    setPriority={setPriority}

                    search={search}
                    setSearch={setSearch}

                    sort={sort}
                    setSort={setSort}

                    resetFilters={resetFilters}

                />

                <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">

                        Recommendations

                    </h2>

                    <span className="text-gray-500">

                        {filteredRecommendations.length} Recommendation(s)

                    </span>

                </div>

                <RecommendationGrid

                    recommendations={filteredRecommendations}

                />

            </div>

        </DashboardLayout>

    );

};

export default Recommendations;