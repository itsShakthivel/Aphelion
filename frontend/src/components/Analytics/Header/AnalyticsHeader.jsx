import { FaChartLine } from "react-icons/fa";

const AnalyticsHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <FaChartLine className="text-3xl text-blue-600" />

                    <div>
                        <h1 className="text-3xl font-bold">
                            Analytics
                        </h1>

                        <p className="text-gray-500">
                            Deep insights into your financial journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsHeader;