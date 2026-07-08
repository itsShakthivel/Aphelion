import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = await dispatch(register(formData));

        if (register.fulfilled.match(result)) {

            setSuccess(true);

        }

    };

    useEffect(() => {

        if (success) {

            const timer = setTimeout(() => {

                navigate("/login");

            }, 2000);

            return () => clearTimeout(timer);

        }

    }, [success, navigate]);

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 p-8 rounded-2xl w-96 shadow-xl"
            >

                <h1 className="text-3xl text-white font-bold mb-8 text-center">

                    Create Account

                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-800 text-white mb-4"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-800 text-white mb-4"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-slate-800 text-white mb-4"
                    required
                />

                {error && (
                    <p className="text-red-400 mb-4">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="text-emerald-400 mb-4">
                        Registration successful! Redirecting...
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded text-white"
                >
                    {loading ? "Creating Account..." : "Signup"}
                </button>

                <p className="text-slate-400 mt-5 text-center">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-emerald-400 ml-2"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Signup;