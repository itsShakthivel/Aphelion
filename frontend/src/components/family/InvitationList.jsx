import { useDispatch } from "react-redux";

import {

    acceptInvitation,

    rejectInvitation,

} from "../../features/family/familySlice";

const InvitationList = ({ invitations }) => {

    const dispatch = useDispatch();

    return (

        <div className="glass rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Pending Invitations

            </h2>

            {

                invitations.length === 0 ? (

                    <p>

                        No Pending Invitations

                    </p>

                ) : (

                    invitations.map(

                        invitation => (

                            <div

                                key={

                                    invitation._id

                                }

                                className="flex justify-between items-center mb-4"

                            >

                                <div>

                                    <h3>

                                        {

                                            invitation.family.name

                                        }

                                    </h3>

                                    <p>

                                        {

                                            invitation.role

                                        }

                                    </p>

                                </div>

                                <div className="flex gap-3">

                                    <button

                                        onClick={() =>

                                            dispatch(

                                                acceptInvitation(

                                                    invitation._id

                                                )

                                            )

                                        }

                                        className="bg-green-600 text-white px-4 py-2 rounded-lg"

                                    >

                                        Accept

                                    </button>

                                    <button

                                        onClick={() =>

                                            dispatch(

                                                rejectInvitation(

                                                    invitation._id

                                                )

                                            )

                                        }

                                        className="bg-red-600 text-white px-4 py-2 rounded-lg"

                                    >

                                        Reject

                                    </button>

                                </div>

                            </div>

                        )

                    )

                )

            }

        </div>

    );

};

export default InvitationList;