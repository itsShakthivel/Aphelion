import API from "./axios";

// ======================================
// Get AI Recommendations
// ======================================

export const getRecommendations = async () => {

    const { data } = await API.get(
        "/ai/recommendations"
    );

    return data;

};