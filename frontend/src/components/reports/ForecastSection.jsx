const ForecastSection = ({ forecast }) => {

    if (!forecast) return null;

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                Forecast Summary

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">

                <div>

                    <p>Income</p>

                    <h3>

                        ₹ {forecast.expectedIncome?.toLocaleString()}

                    </h3>

                </div>

                <div>

                    <p>Expenses</p>

                    <h3>

                        ₹ {forecast.expectedExpenses?.toLocaleString()}

                    </h3>

                </div>

                <div>

                    <p>Savings</p>

                    <h3>

                        ₹ {forecast.expectedSavings?.toLocaleString()}

                    </h3>

                </div>

                <div>

                    <p>Investments</p>

                    <h3>

                        ₹ {forecast.expectedInvestments?.toLocaleString()}

                    </h3>

                </div>

                <div>

                    <p>Net Worth</p>

                    <h3>

                        ₹ {forecast.expectedNetWorth?.toLocaleString()}

                    </h3>

                </div>

            </div>

        </div>

    );

};

export default ForecastSection;