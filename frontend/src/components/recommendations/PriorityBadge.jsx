const colors = {

    Critical: "bg-red-600",

    High: "bg-orange-500",

    Medium: "bg-yellow-500",

    Low: "bg-blue-500",

    Positive: "bg-green-600",

};

const PriorityBadge = ({ priority }) => {

    return (

        <span
            className={`px-3 py-1 rounded-full text-white text-sm ${colors[priority]}`}
        >

            {priority}

        </span>

    );

};

export default PriorityBadge;