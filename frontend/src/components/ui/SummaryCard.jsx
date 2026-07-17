const SummaryCard = ({
    title,
    value,
    icon,
    subtitle,
    color = "blue",
}) => {

    const colors = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        red: "bg-red-100 text-red-600",
        purple: "bg-purple-100 text-purple-600",
        yellow: "bg-yellow-100 text-yellow-600",
        indigo: "bg-indigo-100 text-indigo-600",
    };

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-sm text-gray-500">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="text-xs text-gray-400 mt-2">

                            {subtitle}

                        </p>

                    )}

                </div>

                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}
                >

                    {icon}

                </div>

            </div>

        </div>

    );

};

export default SummaryCard;