const TwinScoreCard = ({ score, grade, risk }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <p className="text-gray-500">

                Financial Twin Score

            </p>

            <h1 className="text-6xl font-bold mt-4">

                {score}

            </h1>

            <div className="flex gap-6 mt-6">

                <div>

                    <p className="text-gray-400">

                        Grade

                    </p>

                    <h2 className="text-2xl font-bold">

                        {grade}

                    </h2>

                </div>

                <div>

                    <p className="text-gray-400">

                        Risk

                    </p>

                    <h2 className="text-2xl font-bold">

                        {risk}

                    </h2>

                </div>

            </div>

        </div>

    );

};

export default TwinScoreCard;