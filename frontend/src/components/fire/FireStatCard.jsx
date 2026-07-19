const FireStatCard = ({

    title,

    value,

}) => {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">

            <p className="text-sm text-zinc-400">

                {title}

            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">

                {value}

            </h3>

        </div>

    );

};

export default FireStatCard;