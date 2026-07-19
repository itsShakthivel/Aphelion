import MetricCard from "../ui/MetricCard";

function SummaryCards({ data, currency = "INR", locale = "en-IN" }) {

    if (!data?.summary) return null;

    const { summary } = data;

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mb-6">

            <MetricCard
                type="netWorth"
                value={summary.netWorth}
                trend={0}
                currency={currency}
                locale={locale}
            />

            <MetricCard
                type="income"
                value={summary.income}
                trend={0}
                currency={currency}
                locale={locale}
            />

            <MetricCard
                type="expenses"
                value={summary.expenses}
                trend={0}
                currency={currency}
                locale={locale}
            />

            <MetricCard
                type="savingsRate"
                value={summary.savingsRate}
                currency={currency}
                locale={locale}
            />

        </div>

    );

}

export default SummaryCards;