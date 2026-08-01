const ForecastStatCard = ({

    title,

    value,

    growth,

}) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="text-3xl font-bold mt-3">

                ₹ {value?.toLocaleString()}

            </h2>

            <p className="text-green-500 mt-2">

                ↑ {growth}%

            </p>

        </div>

    );

};

export default ForecastStatCard;