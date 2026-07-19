import API from "./axios";

export const getFIREPlanner = (params = {}) =>
    API.get("/fire", {
        params,
    });