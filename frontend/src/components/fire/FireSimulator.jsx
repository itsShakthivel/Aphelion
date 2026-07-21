import { useState } from "react";

import FireScenarioForm from "./FireScenarioForm";
import FireScenarioCard from "./FireScenarioCard";

import { getFIREPlanner } from "../../api/fireAPI";

const FireSimulator = ({ planner }) => {

    const [scenario, setScenario] = useState(null);

    const [loading, setLoading] = useState(false);

    const generateScenario = async (values) => {

        try {

            setLoading(true);

            const response =
                await getFIREPlanner(values);

            setScenario(response.data.data);

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="space-y-8">

            <FireScenarioForm
                planner={planner}
                onGenerate={generateScenario}
            />

            {loading ? (

                <div className="text-zinc-400">

                    Generating...

                </div>

            ) : (

                scenario && (

                    <div className="grid gap-6 lg:grid-cols-2">

                        <FireScenarioCard
                            title="Current Plan"
                            scenario={planner}
                        />

                        <FireScenarioCard
                            title="Scenario"
                            scenario={scenario}
                        />

                    </div>

                )

            )}

        </section>

    );

};

export default FireSimulator;