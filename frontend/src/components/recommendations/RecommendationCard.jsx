import PriorityBadge from "./PriorityBadge";

const RecommendationCard = ({ recommendation }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <div className="flex justify-between">

                <div className="text-3xl">

                    {recommendation.icon}

                </div>

                <PriorityBadge
                    priority={recommendation.priority}
                />

            </div>

            <h2 className="text-xl font-bold mt-5">

                {recommendation.title}

            </h2>

            <p className="text-gray-500 mt-3">

                {recommendation.description}

            </p>

            <div className="mt-6">

                <p>

                    <strong>Impact:</strong>{" "}

                    {recommendation.impact}

                </p>

                <p className="mt-2">

                    <strong>Action:</strong>{" "}

                    {recommendation.action}

                </p>

                {recommendation.estimatedSavings >
                    0 && (

                    <p className="mt-2 text-green-600">

                        ₹
                        {recommendation.estimatedSavings.toLocaleString()}
                        /year

                    </p>

                )}

            </div>

        </div>

    );

};

export default RecommendationCard;