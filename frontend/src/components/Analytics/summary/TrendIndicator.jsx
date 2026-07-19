import {
    FaArrowTrendUp,
    FaArrowTrendDown,
} from "react-icons/fa6";

const TrendIndicator = ({ value }) => {

    const positive = value >= 0;

    return (

        <span
            className={`inline-flex items-center gap-1 text-sm font-semibold ${
                positive
                    ? "text-emerald-400"
                    : "text-red-400"
            }`}
        >

            {positive ? (

                <FaArrowTrendUp />

            ) : (

                <FaArrowTrendDown />

            )}

            {Math.abs(value)}%

        </span>

    );

};

export default TrendIndicator;