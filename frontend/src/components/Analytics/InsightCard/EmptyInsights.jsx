import { FaCheckCircle } from "react-icons/fa";

const EmptyInsights = () => {

    return (

        <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center">

            <FaCheckCircle className="mx-auto text-5xl text-emerald-400" />

            <h3 className="mt-4 text-xl font-semibold text-white">

                No Insights Found

            </h3>

            <p className="mt-2 text-zinc-400">

                Everything looks good for this category.

            </p>

        </div>

    );

};

export default EmptyInsights;