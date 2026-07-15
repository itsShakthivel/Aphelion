import API from "./axios";

/*
==========================================
Forgot Password API
==========================================
*/

export const checkEmail = (email) =>
    API.post("/auth/check-email", {
        email,
    });

export const resetPassword = (email, password) =>
    API.post("/auth/reset-password", {
        email,
        password,
    });