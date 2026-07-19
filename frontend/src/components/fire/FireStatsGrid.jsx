import FireStatCard from "./FireStatCard";

const FireStatsGrid = ({ planner }) => {

    if (!planner) return null;

    return (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <FireStatCard
                title="Current Wealth"
                value={`₹${planner.currentWealth.toLocaleString()}`}
            />

            <FireStatCard
                title="Remaining"
                value={`₹${planner.remainingAmount.toLocaleString()}`}
            />

            <FireStatCard
                title="Years Remaining"
                value={planner.yearsRemaining}
            />

            <FireStatCard
                title="Safe Withdrawal"
                value={`₹${planner.safeWithdrawal.toLocaleString()}`}
            />

        </div>

    );

};

export default FireStatsGrid;