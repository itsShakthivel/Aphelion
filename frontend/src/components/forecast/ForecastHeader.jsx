import { FaChartLine } from "react-icons/fa6";

const ForecastHeader = () => {

    return (

        <div>

            <h1 className="text-3xl font-bold flex items-center gap-3">

                <FaChartLine />

                Budget Forecast

            </h1>

            <p className="text-gray-500 mt-2">

                Predict your future income, expenses,
                investments and net worth.

            </p>

        </div>

    );

};

export default ForecastHeader;