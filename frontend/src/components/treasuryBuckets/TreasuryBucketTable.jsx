import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    archiveTreasuryBucket,
} from "../../features/treasuryBucket/treasuryBucketSlice";

const TreasuryBucketTable = () => {

    const dispatch = useDispatch();

    const {
        buckets,
        loading,
    } = useSelector(
        state => state.treasuryBucket
    );

    const handleArchive = bucket => {

        if (bucket.balance > 0) {

            window.alert(

                "This bucket cannot be archived while it has a balance."

            );

            return;

        }

        const confirmed =
            window.confirm(

                `Archive "${bucket.name}"?`

            );

        if (!confirmed) return;

        dispatch(

            archiveTreasuryBucket(

                bucket._id

            )

        );

    };

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                Bucket

                            </th>

                            <th className="p-4 text-left">

                                Description

                            </th>

                            <th className="p-4 text-right">

                                Balance

                            </th>

                            <th className="p-4 text-left">

                                Created

                            </th>

                            <th className="p-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            buckets.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="text-center py-10"

                                    >

                                        No Treasury Buckets Found

                                    </td>

                                </tr>

                            ) : (

                                buckets.map(

                                    bucket => (

                                        <tr

                                            key={bucket._id}

                                            className="border-b"

                                        >

                                            <td className="p-4">

                                                <div className="flex items-center gap-3">

                                                    <div

                                                        className="w-3 h-3 rounded-full"

                                                        style={{

                                                            backgroundColor:

                                                                bucket.color ||

                                                                "#64748b",

                                                        }}

                                                    />

                                                    <span className="font-medium">

                                                        {

                                                            bucket.name

                                                        }

                                                    </span>

                                                </div>

                                            </td>

                                            <td className="p-4">

                                                {

                                                    bucket.description ||

                                                    "-"

                                                }

                                            </td>

                                            <td className="p-4 text-right">

                                                ₹ {

                                                    Number(

                                                        bucket.balance

                                                    ).toLocaleString()

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    new Date(

                                                        bucket.createdAt

                                                    ).toLocaleDateString()

                                                }

                                            </td>

                                            <td className="p-4 text-center">

                                                <button

                                                    onClick={() =>

                                                        handleArchive(

                                                            bucket

                                                        )

                                                    }

                                                    disabled={loading}

                                                    className="border border-red-500 text-red-500 px-3 py-1 rounded-lg"

                                                >

                                                    Archive

                                                </button>

                                            </td>

                                        </tr>

                                    )

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default TreasuryBucketTable;