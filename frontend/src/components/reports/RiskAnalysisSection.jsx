const RiskAnalysisSection = ({ report }) => {

    if (!report) return null;

    const risk = report.executiveSummary?.risk;

    const riskColor = {

        Low: "text-green-600",

        Medium: "text-yellow-500",

        High: "text-red-600",

    };

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">

                Risk Analysis

            </h2>

            <p className={`text-xl font-bold ${riskColor[risk]}`}>

                {risk} Risk

            </p>

            <p className="mt-4 text-gray-600">

                AI has evaluated your financial profile based on
                income stability, debt, investments, savings,
                insurance coverage, and financial health.

            </p>

        </div>

    );

};

export default RiskAnalysisSection;