import { useSelector } from "react-redux";

const Card = ({
    title,
    value,
}) => (

    <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-5">

        <h3 className="text-sm text-gray-500">

            {title}

        </h3>

        <p className="text-2xl font-bold mt-2">

            ₹ {value.toLocaleString()}

        </p>

    </div>

);

const TreasurySummaryCards = () => {

    const { treasury } = useSelector(
        (state) => state.treasury
    );

    if (!treasury) return null;

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

            <Card

                title="Total Balance"

                value={treasury.totalBalance}

            />

            <Card

                title="Available Balance"

                value={treasury.availableBalance}

            />

            <Card

                title="Currency"

                value={treasury.currency}

            />

            <Card

                title="Status"

                value={
                    treasury.isActive
                        ? "Active"
                        : "Inactive"
                }

            />

        </div>

    );

};

export default TreasurySummaryCards;