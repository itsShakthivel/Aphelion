import API from "./axios";

// GET RETIREMENT PLAN
export const getRetirement = () =>
    API.get("/retirement");

// CREATE / UPDATE RETIREMENT PLAN
export const saveRetirement = (data) =>
    API.post("/retirement", data);