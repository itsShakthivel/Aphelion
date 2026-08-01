const AIExecutiveSummary = ({ summary }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">

                AI Executive Summary

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div>

                    <p className="text-gray-500">

                        Score

                    </p>

                    <h3 className="text-2xl font-bold">

                        {summary.score}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Grade

                    </p>

                    <h3 className="text-2xl font-bold">

                        {summary.grade}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Risk

                    </p>

                    <h3 className="text-2xl font-bold">

                        {summary.risk}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Personality

                    </p>

                    <h3 className="text-xl font-bold">

                        {summary.personality}
                    </h3>

                </div>

            </div>

            <p className="mt-6 text-gray-600">

                {summary.summary}

            </p>

        </div>

    );

};

export default AIExecutiveSummary;