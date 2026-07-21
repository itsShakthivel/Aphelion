import { FaFire } from "react-icons/fa";

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);

const FireScenarioCard = ({ title, scenario }) => {

    if (!scenario) return null;

    return (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">

            <div className="mb-5 flex items-center gap-3">

                <FaFire className="text-orange-400 text-xl" />

                <h3 className="text-xl font-semibold text-white">

                    {title}

                </h3>

            </div>

            <div className="space-y-4">

                <Row
                    label="FIRE Age"
                    value={scenario.estimatedFireAge}
                />

                <Row
                    label="Years Remaining"
                    value={scenario.yearsRemaining}
                />

                <Row
                    label="Corpus"
                    value={formatCurrency(scenario.fireCorpus)}
                />

                <Row
                    label="Progress"
                    value={`${scenario.progress}%`}
                />

                <Row
                    label="Monthly Investment"
                    value={formatCurrency(
                        scenario.monthlyInvestment
                    )}
                />

            </div>

        </div>

    );

};

const Row = ({ label, value }) => (

    <div className="flex justify-between">

        <span className="text-zinc-400">

            {label}

        </span>

        <span className="text-white font-semibold">

            {value}

        </span>

    </div>

);

export default FireScenarioCard;