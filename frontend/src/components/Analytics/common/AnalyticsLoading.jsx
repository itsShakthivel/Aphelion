import { FaChartLine } from "react-icons/fa";

const AnalyticsLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24">

            <FaChartLine
                className="text-5xl text-blue-500 animate-pulse"
            />

            <h2 className="mt-6 text-2xl font-semibold text-gray-700">

                Loading Analytics...

            </h2>

            <p className="mt-2 text-gray-500">

                Crunching your financial data...

            </p>

        </div>
    );
};

export default AnalyticsLoading;