const FamilySummary = ({ family }) => {

    if (!family) {

        return (

            <div className="glass rounded-2xl p-8">

                <h2

                    style={{

                        color: "var(--text-primary)",

                    }}

                >

                    You are not part of a Family yet.

                </h2>

            </div>

        );

    }

    return (

        <div className="glass rounded-2xl p-8">

            <h2

                className="text-2xl font-bold"

                style={{

                    color: "var(--text-primary)",

                }}

            >

                {family.name}

            </h2>

            <p

                className="mt-3"

                style={{

                    color: "var(--text-secondary)",

                }}

            >

                {family.description}

            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div>

                    <h3 className="font-semibold">

                        Members

                    </h3>

                    <p>

                        {family.members.length}

                    </p>

                </div>

                <div>

                    <h3 className="font-semibold">

                        Owner

                    </h3>

                    <p>

                        {family.owner?.name}

                    </p>

                </div>

                <div>

                    <h3 className="font-semibold">

                        Invite Code

                    </h3>

                    <p>

                        {family.inviteCode}

                    </p>

                </div>

            </div>

        </div>

    );

};

export default FamilySummary;