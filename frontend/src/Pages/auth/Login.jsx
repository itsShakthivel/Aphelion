import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        error,
        isAuthenticated,
    } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {

        if (isAuthenticated) {
            navigate("/dashboard");
        }

    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(login(formData));

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 w-96 rounded-2xl p-8 shadow-xl"
            >

                <h1 className="text-3xl font-bold text-white mb-8 text-center">

                    Welcome Back

                </h1>

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                    className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none"

                    required

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                    className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none"

                    required

                />

                {error && (

                    <p className="text-red-400 mb-4">

                        {error}

                    </p>

                )}

                <button

                    type="submit"

                    disabled={loading}

                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg"

                >

                    {loading ? "Logging in..." : "Login"}

                </button>

                <p className="text-slate-400 mt-6 text-center">

                    Don't have an account?

                    <Link
                        to="/signup"
                        className="text-emerald-400 ml-2"
                    >
                        Signup
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;