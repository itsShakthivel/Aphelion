import { FaBrain } from "react-icons/fa";

const FinancialPersonality = ({ personality }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <FaBrain size={40} />

            <p className="mt-4 text-gray-400">

                Financial Personality

            </p>

            <h2 className="text-3xl font-bold mt-3">

                {personality}

            </h2>

        </div>

    );

};

export default FinancialPersonality;