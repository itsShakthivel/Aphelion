import SummaryMetricCard from "./SummaryMetricCard";

const MonthlyFinancialSummary = ({ overview }) => {

    if (!overview) return null;

    return (

        <section className="space-y-6">

            <div>

                <h2 className="text-2xl font-bold text-white">

                    Monthly Financial Summary

                </h2>

                <p className="mt-1 text-zinc-400">

                    Your finances compared with the previous month.

                </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <SummaryMetricCard
                    title="Income"
                    value={overview.totalIncome}
                    trend={overview.incomeGrowth ?? 0}
                />

                <SummaryMetricCard
                    title="Expenses"
                    value={overview.totalExpenses}
                    trend={overview.expenseGrowth ?? 0}
                />

                <SummaryMetricCard
                    title="Savings"
                    value={overview.totalSavings}
                    trend={overview.savingsGrowth ?? 0}
                />

                <SummaryMetricCard
                    title="Net Worth"
                    value={overview.netWorth}
                    trend={overview.netWorthGrowth ?? 0}
                />

            </div>

        </section>

    );

};

export default MonthlyFinancialSummary;