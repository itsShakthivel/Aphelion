import { FaExclamationTriangle } from "react-icons/fa";

const AnalyticsError = ({ message }) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">

            <FaExclamationTriangle
                className="mx-auto text-4xl text-red-500"
            />

            <h2 className="mt-4 text-xl font-semibold text-red-600">

                Something went wrong

            </h2>

            <p className="mt-2 text-red-500">

                {message}

            </p>

        </div>
    );
};

export default AnalyticsError;