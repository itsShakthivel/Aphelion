import { useState } from "react";

const FireScenarioForm = ({ planner, onGenerate }) => {

    const [values, setValues] = useState({

        monthlyInvestment:
            planner?.monthlyInvestment || 0,

        expectedReturn:
            planner?.expectedReturn || 12,

        inflation:
            planner?.inflation || 6,

        retirementAge:
            planner?.retirementAge || 50,

        fireMultiplier:
            planner?.fireMultiplier || 25,

    });

    const handleChange = (e) => {

        setValues((prev) => ({

            ...prev,

            [e.target.name]: Number(e.target.value),

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onGenerate(values);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
        >

            <h2 className="text-2xl font-bold text-white">

                Scenario Simulator

            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {[
                    ["monthlyInvestment", "Monthly Investment"],
                    ["expectedReturn", "Expected Return (%)"],
                    ["inflation", "Inflation (%)"],
                    ["retirementAge", "Retirement Age"],
                    ["fireMultiplier", "FIRE Multiplier"],
                ].map(([name, label]) => (

                    <div key={name}>

                        <label className="mb-2 block text-sm text-zinc-400">

                            {label}

                        </label>

                        <input
                            type="number"
                            name={name}
                            value={values[name]}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white"
                        />

                    </div>

                ))}

            </div>

            <button
                className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white"
            >

                Generate Scenario

            </button>

        </form>

    );

};

export default FireScenarioForm;