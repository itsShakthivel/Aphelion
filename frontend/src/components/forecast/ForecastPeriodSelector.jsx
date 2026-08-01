import { useDispatch, useSelector } from "react-redux";

import { fetchForecast } from "../../features/forecast/forecastSlice";

const periods = [

    { label: "1 Month", value: "1m" },

    { label: "3 Months", value: "3m" },

    { label: "6 Months", value: "6m" },

    { label: "1 Year", value: "1y" },

    { label: "5 Years", value: "5y" },

];

const ForecastPeriodSelector = () => {

    const dispatch = useDispatch();

    const { period } = useSelector(
        (state) => state.forecast
    );

    const handleChange = (value) => {

        dispatch(fetchForecast(value));

    };

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

            <div className="flex flex-wrap gap-3">

                {

                    periods.map((item) => (

                        <button

                            key={item.value}

                            onClick={() =>
                                handleChange(item.value)
                            }

                            className={`px-5 py-2 rounded-lg transition

                            ${
                                period === item.value

                                    ? "bg-blue-600 text-white"

                                    : "bg-gray-200 dark:bg-gray-700"

                            }`}

                        >

                            {item.label}

                        </button>

                    ))

                }

            </div>

        </div>

    );

};

export default ForecastPeriodSelector;