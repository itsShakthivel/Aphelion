const FireTimelineSummary = ({ planner }) => {

    if (!planner) return null;

    return (

        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5">

            <h3 className="text-xl font-semibold text-green-400">

                Estimated FIRE Achievement

            </h3>

            <p className="mt-3 text-3xl font-bold text-white">

                Age {planner.estimatedFireAge}

            </p>

            <p className="mt-2 text-zinc-400">

                Approximately {planner.yearsRemaining} years from now.

            </p>

        </div>

    );

};

export default FireTimelineSummary;