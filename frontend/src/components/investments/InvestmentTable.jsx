import {
    FaEdit,
    FaTrash,
} from "react-icons/fa";


const formatType = (
    type
) => {

    const labels = {

        stock:
            "Stock",

        mutual_fund:
            "Mutual Fund",

        etf:
            "ETF",

        gold:
            "Gold",

        crypto:
            "Crypto",

        fd:
            "Fixed Deposit",

        real_estate:
            "Real Estate",

        bond:
            "Bond",

        other:
            "Other",

    };


    return (
        labels[type] ||
        "Other"
    );

};


const formatCategory = (
    category
) => {

    const labels = {

        index_fund:
            "Index Fund",

        flexicap:
            "Flexicap",

        large_cap:
            "Large Cap",

        mid_cap:
            "Mid Cap",

        small_cap:
            "Small Cap",

        multicap:
            "Multicap",

        elss:
            "ELSS",

        debt:
            "Debt",

        other:
            "Other",

    };


    return (
        labels[category] ||
        "Other"
    );

};


const formatCurrency = (
    value
) => {

    return `₹${(
        Number(value) || 0
    ).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 0,
        }
    )}`;

};


const InvestmentTable = ({
    investments = [],
    onEdit,
    onDelete,
}) => {

    // ======================================================
    // EMPTY
    // ======================================================

    if (
        investments.length === 0
    ) {

        return (

            <div
                className="
                    rounded-2xl
                    border
                    border-white/[0.04]
                    bg-[#0b1428]
                    p-10
                    text-center
                    shadow-lg
                    shadow-black/10
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-500/10
                        text-2xl
                        text-blue-400
                    "
                >
                    📊
                </div>


                <h2
                    className="
                        mt-4
                        text-lg
                        font-semibold
                        text-white
                    "
                >
                    No Investments Found
                </h2>


                <p
                    className="
                        mt-2
                        text-sm
                        text-slate-400
                    "
                >
                    Add your first investment to build your portfolio.
                </p>

            </div>

        );

    }


    return (

        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.04]
                bg-[#0b1428]
                shadow-lg
                shadow-black/10
            "
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.04]
                    px-5
                    py-4
                "
            >

                <div>

                    <h2
                        className="
                            text-base
                            font-semibold
                            text-white
                        "
                    >
                        Investment Portfolio
                    </h2>

                    <p
                        className="
                            mt-1
                            text-xs
                            text-slate-500
                        "
                    >
                        Your individual investment holdings.
                    </p>

                </div>


                <span
                    className="
                        rounded-full
                        bg-blue-500/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-blue-400
                    "
                >
                    {investments.length} Holdings
                </span>

            </div>


            {/* ==================================================
                TABLE
            ================================================== */}

            <div
                className="
                    overflow-x-auto
                "
            >

                <table
                    className="
                        min-w-[1050px]
                        w-full
                    "
                >

                    <thead>

                        <tr
                            className="
                                border-b
                                border-white/[0.04]
                                bg-[#091329]
                            "
                        >

                            <th
                                className="
                                    p-4
                                    text-left
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Name
                            </th>

                            <th
                                className="
                                    p-4
                                    text-left
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Type
                            </th>

                            <th
                                className="
                                    p-4
                                    text-right
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Invested
                            </th>

                            <th
                                className="
                                    p-4
                                    text-right
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Current
                            </th>

                            <th
                                className="
                                    p-4
                                    text-right
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Profit / Loss
                            </th>

                            <th
                                className="
                                    p-4
                                    text-right
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                ROI
                            </th>

                            <th
                                className="
                                    p-4
                                    text-center
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Purchase Date
                            </th>

                            <th
                                className="
                                    p-4
                                    text-center
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {investments.map(
                            (
                                investment
                            ) => {

                                const invested =
                                    Number(
                                        investment.investedAmount
                                    ) || 0;


                                const current =
                                    Number(
                                        investment.currentValue
                                    ) || 0;


                                const profit =
                                    current -
                                    invested;


                                const roi =
                                    invested > 0

                                        ? (
                                            profit /
                                            invested
                                        ) * 100

                                        : 0;


                                const positive =
                                    profit >= 0;


                                return (

                                    <tr
                                        key={
                                            investment._id
                                        }
                                        className="
                                            border-b
                                            border-white/[0.035]
                                            transition
                                            hover:bg-white/[0.02]
                                        "
                                    >

                                        {/* ==================================
                                            NAME
                                        ================================== */}

                                        <td
                                            className="
                                                p-4
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        h-9
                                                        w-9
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-blue-500/10
                                                        text-sm
                                                        font-semibold
                                                        text-blue-400
                                                    "
                                                >
                                                    {(
                                                        investment.name ||
                                                        "I"
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>


                                                <div
                                                    className="
                                                        min-w-0
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            max-w-[260px]
                                                            truncate
                                                            text-sm
                                                            font-semibold
                                                            text-white
                                                        "
                                                        title={
                                                            investment.name
                                                        }
                                                    >
                                                        {
                                                            investment.name
                                                        }
                                                    </p>


                                                    {investment.type ===
                                                        "mutual_fund" && (

                                                        <p
                                                            className="
                                                                mt-0.5
                                                                text-xs
                                                                text-slate-500
                                                            "
                                                        >
                                                            {formatCategory(
                                                                investment.category
                                                            )}
                                                        </p>

                                                    )}

                                                </div>

                                            </div>

                                        </td>


                                        {/* ==================================
                                            TYPE
                                        ================================== */}

                                        <td
                                            className="
                                                p-4
                                            "
                                        >

                                            <span
                                                className="
                                                    inline-flex
                                                    rounded-full
                                                    bg-blue-500/10
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    text-blue-400
                                                "
                                            >
                                                {formatType(
                                                    investment.type
                                                )}
                                            </span>

                                        </td>


                                        {/* ==================================
                                            INVESTED
                                        ================================== */}

                                        <td
                                            className="
                                                p-4
                                                text-right
                                                text-sm
                                                font-medium
                                                text-slate-300
                                            "
                                        >
                                            {formatCurrency(
                                                invested
                                            )}
                                        </td>


                                        {/* ==================================
                                            CURRENT
                                        ================================== */}

                                        <td
                                            className="
                                                p-4
                                                text-right
                                                text-sm
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {formatCurrency(
                                                current
                                            )}
                                        </td>


                                        {/* ==================================
                                            PROFIT
                                        ================================== */}

                                        <td
                                            className={`
                                                p-4
                                                text-right
                                                text-sm
                                                font-semibold
                                                ${
                                                    positive
                                                        ? "text-emerald-400"
                                                        : "text-red-400"
                                                }
                                            `}
                                        >

                                            {positive
                                                ? "+"
                                                : "-"}
                                            {formatCurrency(
                                                Math.abs(
                                                    profit
                                                )
                                            )}

                                        </td>


                                        {/* ==================================
                                            ROI
                                        ================================== */}

                                        <td
                                            className={`
                                                p-4
                                                text-right
                                                text-sm
                                                font-semibold
                                                ${
                                                    positive
                                                        ? "text-emerald-400"
                                                        : "text-red-400"
                                                }
                                            `}
                                        >

                                            {positive
                                                ? "+"
                                                : ""}
                                            {roi.toFixed(
                                                2
                                            )}
                                            %

                                        </td>


                                        {/* ==================================
                                            DATE
                                        ================================== */}

                                        <td
                                            className="
                                                p-4
                                                text-center
                                                text-sm
                                                text-slate-400
                                            "
                                        >

                                            {investment.purchaseDate

                                                ? new Date(
                                                    investment.purchaseDate
                                                ).toLocaleDateString()

                                                : "-"
                                            }

                                        </td>


                                        {/* ==================================
                                            ACTIONS
                                        ================================== */}

                                        <td
                                            className="
                                                p-4
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                "
                                            >

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onEdit(
                                                            investment
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-blue-500/10
                                                        text-blue-400
                                                        transition
                                                        hover:bg-blue-500/20
                                                    "
                                                    title="Edit"
                                                >
                                                    <FaEdit
                                                        size={13}
                                                    />
                                                </button>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onDelete(
                                                            investment
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-red-500/10
                                                        text-red-400
                                                        transition
                                                        hover:bg-red-500/20
                                                    "
                                                    title="Delete"
                                                >
                                                    <FaTrash
                                                        size={13}
                                                    />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                );

                            }
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};


export default InvestmentTable;