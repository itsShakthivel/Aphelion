import { FaCalendarAlt } from "react-icons/fa";

const AnalyticsDateFilter = () => {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div className="flex items-center gap-3">

                    <FaCalendarAlt
                        className="text-blue-500 text-xl"
                    />

                    <div>

                        <h3 className="font-semibold">

                            Date Range

                        </h3>

                        <p className="text-sm text-gray-500">

                            Filter analytics by date.

                        </p>

                    </div>

                </div>

                <div className="flex gap-3 flex-wrap">

                    <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">

                        This Month

                    </button>

                    <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">

                        Last Month

                    </button>

                    <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">

                        6 Months

                    </button>

                    <button className="px-4 py-2 rounded-lg border hover:bg-gray-100">

                        1 Year

                    </button>

                </div>

            </div>

        </div>

    );

};

export default AnalyticsDateFilter;