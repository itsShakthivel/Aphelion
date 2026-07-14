import API from "./axios";

// GET ALL GOALS

export const getGoals = () =>
    API.get("/goals");

// GET SINGLE GOAL

export const getGoal = (id) =>
    API.get(`/goals/${id}`);

// CREATE GOAL

export const createGoal = (data) =>
    API.post("/goals", data);

// UPDATE GOAL

export const updateGoal = (id, data) =>
    API.put(`/goals/${id}`, data);

// DELETE GOAL

export const deleteGoal = (id) =>
    API.delete(`/goals/${id}`);