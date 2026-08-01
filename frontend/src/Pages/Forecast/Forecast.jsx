import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { fetchForecast } from "../../features/forecast/forecastSlice";

import ForecastHeader from "../../components/forecast/ForecastHeader";
import ForecastSummary from "../../components/forecast/ForecastSummary";
import ForecastPeriodSelector from "../../components/forecast/ForecastPeriodSelector";
import ForecastChart from "../../components/forecast/ForecastChart";
import ForecastTable from "../../components/forecast/ForecastTable";
import ForecastInsights from "../../components/forecast/ForecastInsights";

const Forecast = () => {

    const dispatch = useDispatch();

    const {

        summary,

        forecast,

        insights,

        period,

        loading,

        error,

    } = useSelector(
        (state) => state.forecast
    );

    useEffect(() => {

        dispatch(fetchForecast(period));

    }, [dispatch, period]);

    if (loading)

        return (

            <DashboardLayout>

                <div className="text-center py-20">

                    Loading Forecast...

                </div>

            </DashboardLayout>

        );

    if (error)

        return (

            <DashboardLayout>

                <div className="text-center text-red-500 py-20">

                    {error}

                </div>

            </DashboardLayout>

        );

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <ForecastHeader />

                <ForecastPeriodSelector />

                <ForecastSummary
                    summary={summary}
                />

                <ForecastChart
                    forecast={forecast}
                />

                <ForecastInsights
                    insights={insights}
                />

                <ForecastTable
                    forecast={forecast}
                />

            </div>

        </DashboardLayout>

    );

};

export default Forecast;