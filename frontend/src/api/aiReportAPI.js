import API from "./axios";

export const getAIReport = async () => {

    const { data } = await API.get("/ai/report");

    return data;

};