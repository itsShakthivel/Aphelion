const TwinSummaryCard = ({ summary }) => {

    return (

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8">

            <h2 className="text-2xl font-bold">

                AI Summary

            </h2>

            <p className="mt-4 leading-8">

                {summary}

            </p>

        </div>

    );

};

export default TwinSummaryCard;