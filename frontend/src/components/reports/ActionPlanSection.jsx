const ActionPlanSection = ({ actions }) => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                Next Month Action Plan

            </h2>

            <ol className="list-decimal ml-6 space-y-3">

                {actions?.map((item, index) => (

                    <li key={index}>

                        {item}

                    </li>

                ))}

            </ol>

        </div>

    );

};

export default ActionPlanSection;