import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    checkEmail,
    resetPassword,
} from "../../api/forgotPasswordAPI";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleVerifyEmail = async () => {

        setError("");
        setLoading(true);

        try {

            const response = await checkEmail(email);

            if (response.data.exists) {

                setStep(2);

            } else {

                setError("Email not found.");

            }

        } catch {

            setError("Something went wrong.");

        }

        setLoading(false);

    };

    const handleResetPassword = async () => {

        setError("");

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;

        }

        setLoading(true);

        try {

            await resetPassword(email, password);

            alert("Password updated successfully.");

            navigate("/login");

        } catch {

            setError("Unable to reset password.");

        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-100">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-6">

                    Forgot Password

                </h1>

                {step === 1 ? (

                    <>

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 mb-6"
                            placeholder="Enter your email"
                        />

                        <button
                            onClick={handleVerifyEmail}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg"
                        >

                            {loading
                                ? "Checking..."
                                : "Verify Email"}

                        </button>

                    </>

                ) : (

                    <>

                        <label className="block mb-2 font-medium">

                            New Password

                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3 mb-4"
                        />

                        <label className="block mb-2 font-medium">

                            Confirm Password

                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3 mb-6"
                        />

                        <button
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg"
                        >

                            {loading
                                ? "Updating..."
                                : "Update Password"}

                        </button>

                    </>

                )}

                {error && (

                    <p className="text-red-600 mt-4 text-center">

                        {error}

                    </p>

                )}

            </div>

        </div>

    );

};

export default ForgotPassword;