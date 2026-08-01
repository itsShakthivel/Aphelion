import ForecastStatCard from "./ForecastStatCard";

const ForecastSummary = ({ summary }) => {

    if (!summary) return null;

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

            <ForecastStatCard

                title="Income"

                value={summary.expectedIncome}

                growth={summary.incomeGrowth}

            />

            <ForecastStatCard

                title="Expenses"

                value={summary.expectedExpenses}

                growth={summary.expenseGrowth}

            />

            <ForecastStatCard

                title="Savings"

                value={summary.expectedSavings}

                growth="--"

            />

            <ForecastStatCard

                title="Investments"

                value={summary.expectedInvestments}

                growth={summary.investmentGrowth}

            />

            <ForecastStatCard

                title="Net Worth"

                value={summary.expectedNetWorth}

                growth={summary.netWorthGrowth}

            />

        </div>

    );

};

export default ForecastSummary;