const RecommendationSection = ({ recommendations }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                AI Recommendations

            </h2>

            <div className="space-y-4">

                {recommendations?.map((item) => (

                    <div
                        key={item.id}
                        className="border rounded-lg p-4"
                    >

                        <div className="flex justify-between">

                            <h3 className="font-semibold">

                                {item.title}

                            </h3>

                            <span>

                                {item.priority}

                            </span>

                        </div>

                        <p className="mt-2 text-gray-600">

                            {item.description}

                        </p>

                        <p className="mt-2 text-blue-600">

                            {item.action}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default RecommendationSection;