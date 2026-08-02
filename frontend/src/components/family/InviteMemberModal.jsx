import { useState } from "react";
import { useDispatch } from "react-redux";

import {

    sendInvitation,

} from "../../features/family/familySlice";

const InviteMemberModal = ({ family }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const [role, setRole] = useState("Member");

    if (!family) return null;

    const submitHandler = () => {

        dispatch(

            sendInvitation({

                family: family._id,

                receiverEmail: email,

                role,

            })

        );

        setEmail("");

    };

    return (

        <div className="glass rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-5">

                Invite Member

            </h2>

            <div className="flex gap-4">

                <input

                    value={email}

                    onChange={(e) =>

                        setEmail(

                            e.target.value

                        )

                    }

                    placeholder="Email"

                    className="flex-1 rounded-xl p-3"

                />

                <select

                    value={role}

                    onChange={(e) =>

                        setRole(

                            e.target.value

                        )

                    }

                    className="rounded-xl p-3"

                >

                    <option>

                        Admin

                    </option>

                    <option>

                        Member

                    </option>

                    <option>

                        Viewer

                    </option>

                </select>

                <button

                    onClick={submitHandler}

                    className="bg-indigo-600 text-white px-5 rounded-xl"

                >

                    Invite

                </button>

            </div>

        </div>

    );

};

export default InviteMemberModal;