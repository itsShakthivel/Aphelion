const colors = {

    Positive:
        "border-green-500 bg-green-50",

    Warning:
        "border-yellow-500 bg-yellow-50",

    Critical:
        "border-red-500 bg-red-50",

};

const ForecastInsights = ({ insights }) => {

    return (

        <div className="space-y-4">

            <h2 className="text-xl font-bold">

                AI Insights

            </h2>

            {

                insights.map((item, index) => (

                    <div

                        key={index}

                        className={`border-l-4 rounded-lg p-5 ${colors[item.type]}`}

                    >

                        <h3 className="font-semibold">

                            {item.title}

                        </h3>

                        <p className="mt-2 text-gray-600">

                            {item.description}

                        </p>

                    </div>

                ))

            }

        </div>

    );

};

export default ForecastInsights;