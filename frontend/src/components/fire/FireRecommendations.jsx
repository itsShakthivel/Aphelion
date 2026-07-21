import FireRecommendationCard from "./FireRecommendationCard";

const FireRecommendations = ({ recommendations }) => {

    if (!recommendations?.length) return null;

    return (

        <section className="space-y-6">

            <h2 className="text-2xl font-bold text-white">

                Smart FIRE Recommendations

            </h2>

            <div className="grid gap-5">

                {recommendations.map((recommendation, index) => (

                    <FireRecommendationCard

                        key={index}

                        recommendation={recommendation}

                    />

                ))}

            </div>

        </section>

    );

};

export default FireRecommendations;