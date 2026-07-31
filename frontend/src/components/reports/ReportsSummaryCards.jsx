import {

    FaFilePdf,

    FaFileCsv,

    FaClockRotateLeft,

} from "react-icons/fa6";

const cards = [

    {

        title: "PDF Reports",

        value: "--",

        icon: <FaFilePdf />,

    },

    {

        title: "CSV Exports",

        value: "--",

        icon: <FaFileCsv />,

    },

    {

        title: "History",

        value: "--",

        icon: <FaClockRotateLeft />,

    },

];

const ReportsSummaryCards = () => {

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {

                cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div

                            key={card.title}

                            className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6"

                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-zinc-400">

                                        {card.title}

                                    </p>

                                    <h2 className="text-3xl text-white font-bold mt-2">

                                        {card.value}

                                    </h2>

                                </div>

                                <Icon

                                    className="text-3xl text-indigo-500"

                                />

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

};

export default ReportsSummaryCards;