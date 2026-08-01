import API from "./axios";

export const getForecast = async (period = "1y") => {

    const { data } = await API.get(
        `/ai/forecast?period=${period}`
    );

    return data;

};