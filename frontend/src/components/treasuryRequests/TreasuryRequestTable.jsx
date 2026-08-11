import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    approveTreasuryRequest,
    rejectTreasuryRequest,
} from "../../features/treasuryRequest/treasuryRequestSlice";

const TreasuryRequestTable = () => {

    const dispatch = useDispatch();

    const {
        requests,
        loading,
    } = useSelector(
        state => state.treasuryRequest
    );

    const {
        family,
    } = useSelector(
        state => state.family
    );

    const handleApprove = requestId => {

        dispatch(

            approveTreasuryRequest(

                requestId

            )

        );

    };

    const handleReject = requestId => {

        const reason =
            window.prompt(
                "Enter rejection reason:"
            );

        if (reason === null) return;

        dispatch(

            rejectTreasuryRequest({

                requestId,

                rejectionReason:
                    reason,

            })

        );

    };

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                Requester

                            </th>

                            <th className="p-4 text-left">

                                Purpose

                            </th>

                            <th className="p-4 text-left">

                                Category

                            </th>

                            <th className="p-4 text-right">

                                Amount

                            </th>

                            <th className="p-4 text-left">

                                Status

                            </th>

                            <th className="p-4 text-left">

                                Date

                            </th>

                            <th className="p-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            requests.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="7"

                                        className="text-center py-10"

                                    >

                                        No Treasury Requests Found

                                    </td>

                                </tr>

                            ) : (

                                requests.map(

                                    request => (

                                        <tr

                                            key={request._id}

                                            className="border-b"

                                        >

                                            <td className="p-4">

                                                {

                                                    request.requester?.name ||

                                                    "Unknown"

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    request.purpose

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    request.category

                                                }

                                            </td>

                                            <td className="p-4 text-right">

                                                ₹ {

                                                    request.amount.toLocaleString()

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    request.status

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    new Date(

                                                        request.createdAt

                                                    ).toLocaleDateString()

                                                }

                                            </td>

                                            <td className="p-4">

                                                {

                                                    request.status ===

                                                    "Pending" && (

                                                        <div className="flex justify-center gap-2">

                                                            <button

                                                                onClick={() =>

                                                                    handleApprove(

                                                                        request._id

                                                                    )

                                                                }

                                                                disabled={loading}

                                                                className="bg-green-600 text-white px-3 py-1 rounded-lg"

                                                            >

                                                                Approve

                                                            </button>

                                                            <button

                                                                onClick={() =>

                                                                    handleReject(

                                                                        request._id

                                                                    )

                                                                }

                                                                disabled={loading}

                                                                className="bg-red-600 text-white px-3 py-1 rounded-lg"

                                                            >

                                                                Reject

                                                            </button>

                                                        </div>

                                                    )

                                                }

                                                {

                                                    request.status ===

                                                    "Rejected" &&

                                                    request.rejectionReason && (

                                                        <span className="text-sm text-gray-500">

                                                            {

                                                                request.rejectionReason

                                                            }

                                                        </span>

                                                    )

                                                }

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

export default TreasuryRequestTable;