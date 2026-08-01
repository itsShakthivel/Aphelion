const FinancialHealthSection = ({ health }) => {

    if (!health) return null;

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                Financial Health

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div>

                    <h3 className="font-semibold text-green-600 mb-3">

                        Strengths

                    </h3>

                    <ul className="space-y-2 list-disc ml-5">

                        {health.strengths?.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>

                <div>

                    <h3 className="font-semibold text-red-600 mb-3">

                        Weaknesses

                    </h3>

                    <ul className="space-y-2 list-disc ml-5">

                        {health.weaknesses?.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>

                <div>

                    <h3 className="font-semibold text-blue-600 mb-3">

                        Focus Areas

                    </h3>

                    <ul className="space-y-2 list-disc ml-5">

                        {health.focusAreas?.map((item, index) => (

                            <li key={index}>{item}</li>

                        ))}

                    </ul>

                </div>

            </div>

        </div>

    );

};

export default FinancialHealthSection;