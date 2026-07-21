import {
    FaCheckCircle,
    FaArrowTrendUp,
    FaPiggyBank,
    FaBullseye,
    FaTriangleExclamation,
} from "react-icons/fa6";

const icons = {

    success: FaCheckCircle,

    info: FaArrowTrendUp,

    investment: FaPiggyBank,

    goal: FaBullseye,

    warning: FaTriangleExclamation,

    expense: FaTriangleExclamation,

};

const FireRecommendationCard = ({ recommendation }) => {

    const Icon =
        icons[recommendation.type] ||
        FaArrowTrendUp;

    return (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

            <div className="flex gap-4">

                <Icon className="mt-1 text-xl text-orange-400" />

                <div>

                    <h3 className="font-semibold text-white">

                        {recommendation.title}

                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">

                        {recommendation.description}

                    </p>

                </div>

            </div>

        </div>

    );

};

export default FireRecommendationCard;