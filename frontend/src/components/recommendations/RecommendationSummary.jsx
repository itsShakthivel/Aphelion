const StatCard = ({ title, value, color }) => (

    <div
        className={`rounded-xl shadow-md p-5 text-white ${color}`}
    >

        <p className="text-sm opacity-90">

            {title}

        </p>

        <h2 className="text-3xl font-bold mt-2">

            {value}

        </h2>

    </div>

);

const RecommendationSummary = ({ summary }) => {

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Smart Recommendations

            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">

                <StatCard
                    title="Total"
                    value={summary.total}
                    color="bg-blue-600"
                />

                <StatCard
                    title="Critical"
                    value={summary.critical}
                    color="bg-red-600"
                />

                <StatCard
                    title="High"
                    value={summary.high}
                    color="bg-orange-500"
                />

                <StatCard
                    title="Medium"
                    value={summary.medium}
                    color="bg-yellow-500"
                />

                <StatCard
                    title="Low"
                    value={summary.low}
                    color="bg-sky-500"
                />

                <StatCard
                    title="Positive"
                    value={summary.positive}
                    color="bg-green-600"
                />

            </div>

        </div>

    );

};

export default RecommendationSummary;