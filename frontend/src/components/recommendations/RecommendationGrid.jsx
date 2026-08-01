import RecommendationCard from "./RecommendationCard";

const RecommendationGrid = ({
    recommendations,
}) => {

    return (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {recommendations.map((recommendation) => (

                <RecommendationCard

                    key={recommendation.id}

                    recommendation={recommendation}

                />

            ))}

        </div>

    );

};

export default RecommendationGrid;