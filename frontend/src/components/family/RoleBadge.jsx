const colors = {

    Owner: "bg-purple-600",

    Admin: "bg-blue-600",

    Member: "bg-green-600",

    Viewer: "bg-gray-600",

};

const RoleBadge = ({ role }) => {

    return (

        <span

            className={`

                px-3

                py-1

                rounded-full

                text-white

                text-sm

                ${colors[role]}

            `}

        >

            {role}

        </span>

    );

};

export default RoleBadge;