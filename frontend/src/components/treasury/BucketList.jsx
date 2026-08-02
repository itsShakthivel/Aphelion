import { useSelector } from "react-redux";

const BucketList = () => {

    const { buckets } = useSelector(
        (state) => state.treasury
    );

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-semibold">

                    Treasury Buckets

                </h2>

            </div>

            {

                buckets.length === 0 ? (

                    <p className="text-gray-500">

                        No buckets created.

                    </p>

                ) : (

                    <div className="space-y-3">

                        {

                            buckets.map(
                                (bucket) => (

                                    <div

                                        key={bucket._id}

                                        className="flex justify-between items-center border rounded-lg px-4 py-3"

                                    >

                                        <div>

                                            <h3 className="font-semibold">

                                                {bucket.name}

                                            </h3>

                                            <p className="text-sm text-gray-500">

                                                {bucket.type}

                                            </p>

                                        </div>

                                        <div className="font-bold">

                                            ₹ {bucket.balance.toLocaleString()}

                                        </div>

                                    </div>

                                )
                            )

                        }

                    </div>

                )

            }

        </div>

    );

};

export default BucketList;