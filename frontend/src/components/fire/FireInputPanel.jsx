import { useState } from "react";

const FireInputPanel = ({ planner, onApply }) => {

    const [form, setForm] = useState({

        retirementAge: planner?.retirementAge ?? 50,

        expectedReturn: planner?.expectedReturn ?? 12,

        inflation: planner?.inflation ?? 6,

        fireMultiplier: planner?.fireMultiplier ?? 25,

        monthlyInvestment: planner?.monthlyInvestment ?? 0,

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: Number(value),

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onApply(form);

    };

    return (

        <form

            onSubmit={handleSubmit}

            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5"

        >

            <h2 className="text-2xl font-bold text-white">

                FIRE Assumptions

            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                <Input
                    label="Retirement Age"
                    name="retirementAge"
                    value={form.retirementAge}
                    onChange={handleChange}
                />

                <Input
                    label="Expected Return (%)"
                    name="expectedReturn"
                    value={form.expectedReturn}
                    onChange={handleChange}
                />

                <Input
                    label="Inflation (%)"
                    name="inflation"
                    value={form.inflation}
                    onChange={handleChange}
                />

                <Input
                    label="FIRE Multiplier"
                    name="fireMultiplier"
                    value={form.fireMultiplier}
                    onChange={handleChange}
                />

                <Input
                    label="Monthly Investment"
                    name="monthlyInvestment"
                    value={form.monthlyInvestment}
                    onChange={handleChange}
                />

            </div>

            <button

                type="submit"

                className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600 transition"

            >

                Update Projection

            </button>

        </form>

    );

};

const Input = ({

    label,

    name,

    value,

    onChange,

}) => (

    <div>

        <label className="mb-2 block text-sm text-zinc-400">

            {label}

        </label>

        <input

            type="number"

            name={name}

            value={value}

            onChange={onChange}

            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-orange-500"

        />

    </div>

);

export default FireInputPanel;