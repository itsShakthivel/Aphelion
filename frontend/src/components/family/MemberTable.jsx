import RoleBadge from "./RoleBadge";

const MembersTable = ({ family }) => {

    if (!family) return null;

    return (

        <div className="glass rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Family Members

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th className="text-left">

                            Name

                        </th>

                        <th className="text-left">

                            Email

                        </th>

                        <th className="text-left">

                            Role

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        family.members.map(

                            member => (

                                <tr

                                    key={member.user._id}

                                >

                                    <td>

                                        {

                                            member.user.name

                                        }

                                    </td>

                                    <td>

                                        {

                                            member.user.email

                                        }

                                    </td>

                                    <td>

                                        <RoleBadge

                                            role={member.role}

                                        />

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

};

export default MembersTable;