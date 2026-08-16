import {
    FaTimes,
    FaFileExcel,
    FaCheckCircle,
    FaExclamationCircle,
    FaUpload,
} from "react-icons/fa";


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


const formatNumber = (
    value
) => {

    if (
        value === null ||
        value === undefined
    ) {

        return "-";

    }


    return Number(value).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 4,
        }
    );

};


const formatDate = (
    value
) => {

    if (!value) {

        return "-";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "-";

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
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
        category ||
        "Other"
    );

};


const InvestmentImportPreviewModal = ({
    open,
    preview,
    loading = false,
    importLoading = false,
    error = null,
    onClose,
    onConfirm,
}) => {

    if (
        !open
    ) {

        return null;

    }


    const data =
        preview?.data ||
        preview ||
        {};


    const holdings =
        Array.isArray(
            data.holdings
        )

            ? data.holdings

            : [];


    const summary =
        data.summary || {

            total:
                holdings.length,

            new:
                holdings.filter(
                    (holding) =>
                        holding.status ===
                        "new"
                ).length,

            existing:
                holdings.filter(
                    (holding) =>
                        holding.status ===
                        "existing"
                ).length,

        };


    const valuationDate =
        data.valuationDate;


    const isBusy =
        loading ||
        importLoading;


    return (

        <div
            className="
                fixed
                inset-0
                z-[60]
                flex
                items-center
                justify-center
                bg-black/75
                p-4
                backdrop-blur-sm
            "
        >

            <div
                className="
                    flex
                    max-h-[92vh]
                    w-full
                    max-w-6xl
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-[#0b1428]
                    shadow-2xl
                    shadow-black/50
                "
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-white/[0.05]
                        bg-[#0b1428]
                        px-6
                        py-5
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
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-500/10
                                text-lg
                                text-emerald-400
                            "
                        >
                            <FaFileExcel />
                        </div>


                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-white
                                "
                            >
                                Import Angel One Portfolio
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                "
                            >
                                Review the holdings found in your XLSX file before importing.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        disabled={
                            isBusy
                        }
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-white/5
                            text-slate-400
                            transition
                            hover:bg-white/10
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        <FaTimes />
                    </button>

                </div>


                {/* ==================================================
                    LOADING
                ================================================== */}

                {loading && (

                    <div
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            p-10
                        "
                    >

                        <div
                            className="
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    h-10
                                    w-10
                                    animate-spin
                                    rounded-full
                                    border-2
                                    border-slate-700
                                    border-t-blue-400
                                "
                            />

                            <p
                                className="
                                    mt-4
                                    text-sm
                                    font-medium
                                    text-slate-300
                                "
                            >
                                Reading your Angel One portfolio...
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-slate-500
                                "
                            >
                                Please wait while we validate the Excel file.
                            </p>

                        </div>

                    </div>

                )}


                {/* ==================================================
                    ERROR
                ================================================== */}

                {!loading &&
                    error && (

                    <div
                        className="
                            m-6
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            p-5
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                gap-3
                            "
                        >

                            <FaExclamationCircle
                                className="
                                    mt-0.5
                                    shrink-0
                                    text-red-400
                                "
                            />

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-red-300
                                    "
                                >
                                    Import Preview Failed
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-red-400
                                    "
                                >
                                    {error}
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* ==================================================
                    CONTENT
                ================================================== */}

                {!loading &&
                    !error && (

                    <>

                        {/* ==================================================
                            SUMMARY
                        ================================================== */}

                        <div
                            className="
                                shrink-0
                                border-b
                                border-white/[0.04]
                                px-6
                                py-5
                            "
                        >

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-3
                                    sm:grid-cols-3
                                "
                            >

                                {/* TOTAL */}

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-white/[0.04]
                                        bg-[#071126]
                                        p-4
                                    "
                                >

                                    <p
                                        className="
                                            text-xs
                                            font-medium
                                            text-slate-500
                                        "
                                    >
                                        Total Holdings
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-2xl
                                            font-bold
                                            text-white
                                        "
                                    >
                                        {summary.total}
                                    </p>

                                </div>


                                {/* NEW */}

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-emerald-500/10
                                        bg-emerald-500/5
                                        p-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <div>

                                            <p
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-slate-500
                                                "
                                            >
                                                New Holdings
                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-2xl
                                                    font-bold
                                                    text-emerald-400
                                                "
                                            >
                                                {summary.new}
                                            </p>

                                        </div>


                                        <FaCheckCircle
                                            className="
                                                text-lg
                                                text-emerald-400
                                            "
                                        />

                                    </div>

                                </div>


                                {/* EXISTING */}

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-amber-500/10
                                        bg-amber-500/5
                                        p-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <div>

                                            <p
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-slate-500
                                                "
                                            >
                                                Existing Holdings
                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    text-2xl
                                                    font-bold
                                                    text-amber-400
                                                "
                                            >
                                                {summary.existing}
                                            </p>

                                        </div>


                                        <FaExclamationCircle
                                            className="
                                                text-lg
                                                text-amber-400
                                            "
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* FILE INFO */}

                            <div
                                className="
                                    mt-4
                                    flex
                                    flex-wrap
                                    gap-x-5
                                    gap-y-2
                                    text-xs
                                    text-slate-500
                                "
                            >

                                <span>
                                    Broker:
                                    <span
                                        className="
                                            ml-1
                                            font-medium
                                            text-slate-300
                                        "
                                    >
                                        Angel One
                                    </span>
                                </span>


                                {data.worksheet && (

                                    <span>
                                        Worksheet:
                                        <span
                                            className="
                                                ml-1
                                                font-medium
                                                text-slate-300
                                            "
                                        >
                                            {data.worksheet}
                                        </span>
                                    </span>

                                )}


                                {valuationDate && (

                                    <span>
                                        Valuation Date:
                                        <span
                                            className="
                                                ml-1
                                                font-medium
                                                text-slate-300
                                            "
                                        >
                                            {formatDate(
                                                valuationDate
                                            )}
                                        </span>
                                    </span>

                                )}

                            </div>

                        </div>


                        {/* ==================================================
                            HOLDINGS LIST
                        ================================================== */}

                        <div
                            className="
                                min-h-0
                                flex-1
                                overflow-y-auto
                                px-6
                                py-5
                            "
                        >

                            {holdings.length === 0 ? (

                                <div
                                    className="
                                        flex
                                        h-48
                                        flex-col
                                        items-center
                                        justify-center
                                        text-center
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-slate-500/10
                                            text-xl
                                            text-slate-500
                                        "
                                    >
                                        <FaFileExcel />
                                    </div>

                                    <p
                                        className="
                                            mt-4
                                            text-sm
                                            font-medium
                                            text-slate-400
                                        "
                                    >
                                        No holdings found
                                    </p>

                                </div>

                            ) : (

                                <div
                                    className="
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-white/[0.04]
                                    "
                                >

                                    {/* TABLE HEADER */}

                                    <div
                                        className="
                                            hidden
                                            grid-cols-[minmax(240px,2fr)_120px_130px_130px_120px]
                                            gap-4
                                            border-b
                                            border-white/[0.04]
                                            bg-[#071126]
                                            px-4
                                            py-3
                                            text-xs
                                            font-semibold
                                            text-slate-500
                                            lg:grid
                                        "
                                    >

                                        <span>
                                            Investment
                                        </span>

                                        <span>
                                            Status
                                        </span>

                                        <span>
                                            Invested
                                        </span>

                                        <span>
                                            Current
                                        </span>

                                        <span>
                                            ROI
                                        </span>

                                    </div>


                                    {/* HOLDINGS */}

                                    <div
                                        className="
                                            divide-y
                                            divide-white/[0.04]
                                        "
                                    >

                                        {holdings.map(
                                            (
                                                holding,
                                                index
                                            ) => {

                                                const invested =
                                                    Number(
                                                        holding.investedAmount
                                                    ) || 0;


                                                const current =
                                                    Number(
                                                        holding.currentValue
                                                    ) || 0;


                                                const profit =
                                                    Number(
                                                        holding.profitLoss
                                                    ) || (
                                                        current -
                                                        invested
                                                    );


                                                const calculatedROI =
                                                    invested > 0

                                                        ? (
                                                            profit /
                                                            invested
                                                        ) * 100

                                                        : 0;


                                                const roi =
                                                    holding.roi !==
                                                    null &&
                                                    holding.roi !==
                                                    undefined

                                                        ? Number(
                                                            holding.roi
                                                        ) || 0

                                                        : calculatedROI;


                                                const isNew =
                                                    holding.status ===
                                                    "new";


                                                return (

                                                    <div
                                                        key={
                                                            holding.existingId ||
                                                            holding.name ||
                                                            index
                                                        }
                                                        className="
                                                            grid
                                                            grid-cols-1
                                                            gap-3
                                                            bg-[#0b1428]
                                                            px-4
                                                            py-4
                                                            transition
                                                            hover:bg-[#0d1830]
                                                            lg:grid-cols-[minmax(240px,2fr)_120px_130px_130px_120px]
                                                            lg:items-center
                                                            lg:gap-4
                                                        "
                                                    >

                                                        {/* ==================================
                                                            INVESTMENT
                                                        ================================== */}

                                                        <div
                                                            className="
                                                                min-w-0
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
                                                                        holding.name ||
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
                                                                            truncate
                                                                            text-sm
                                                                            font-semibold
                                                                            text-white
                                                                        "
                                                                        title={
                                                                            holding.name
                                                                        }
                                                                    >
                                                                        {
                                                                            holding.name
                                                                        }
                                                                    </p>


                                                                    <div
                                                                        className="
                                                                            mt-1
                                                                            flex
                                                                            flex-wrap
                                                                            gap-2
                                                                        "
                                                                    >

                                                                        <span
                                                                            className="
                                                                                text-xs
                                                                                text-slate-500
                                                                            "
                                                                        >
                                                                            {holding.type ===
                                                                            "mutual_fund"

                                                                                ? "Mutual Fund"

                                                                                : holding.type ||
                                                                                  "Investment"
                                                                            }
                                                                        </span>


                                                                        {holding.type ===
                                                                            "mutual_fund" &&
                                                                            holding.brokerData?.subCategory && (

                                                                            <span
                                                                                className="
                                                                                    text-xs
                                                                                    text-slate-600
                                                                                "
                                                                            >
                                                                                •
                                                                                {
                                                                                    formatCategory(
                                                                                        holding.brokerData.subCategory
                                                                                    )
                                                                                }
                                                                            </span>

                                                                        )}

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>


                                                        {/* ==================================
                                                            STATUS
                                                        ================================== */}

                                                        <div>

                                                            <span
                                                                className={`
                                                                    inline-flex
                                                                    items-center
                                                                    rounded-full
                                                                    px-2.5
                                                                    py-1
                                                                    text-xs
                                                                    font-semibold
                                                                    ${
                                                                        isNew

                                                                            ? "bg-emerald-500/10 text-emerald-400"

                                                                            : "bg-amber-500/10 text-amber-400"
                                                                    }
                                                                `}
                                                            >

                                                                {isNew
                                                                    ? "New"
                                                                    : "Existing"}

                                                            </span>

                                                        </div>


                                                        {/* ==================================
                                                            INVESTED
                                                        ================================== */}

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                lg:block
                                                            "
                                                        >

                                                            <span
                                                                className="
                                                                    text-xs
                                                                    text-slate-500
                                                                    lg:hidden
                                                                "
                                                            >
                                                                Invested
                                                            </span>

                                                            <span
                                                                className="
                                                                    text-sm
                                                                    font-medium
                                                                    text-slate-300
                                                                "
                                                            >
                                                                {formatCurrency(
                                                                    invested
                                                                )}
                                                            </span>

                                                        </div>


                                                        {/* ==================================
                                                            CURRENT
                                                        ================================== */}

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                lg:block
                                                            "
                                                        >

                                                            <span
                                                                className="
                                                                    text-xs
                                                                    text-slate-500
                                                                    lg:hidden
                                                                "
                                                            >
                                                                Current
                                                            </span>

                                                            <span
                                                                className="
                                                                    text-sm
                                                                    font-semibold
                                                                    text-white
                                                                "
                                                            >
                                                                {formatCurrency(
                                                                    current
                                                                )}
                                                            </span>

                                                        </div>


                                                        {/* ==================================
                                                            ROI
                                                        ================================== */}

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                lg:block
                                                            "
                                                        >

                                                            <span
                                                                className="
                                                                    text-xs
                                                                    text-slate-500
                                                                    lg:hidden
                                                                "
                                                            >
                                                                ROI
                                                            </span>

                                                            <span
                                                                className={`
                                                                    text-sm
                                                                    font-semibold
                                                                    ${
                                                                        roi >= 0

                                                                            ? "text-emerald-400"

                                                                            : "text-red-400"
                                                                    }
                                                                `}
                                                            >
                                                                {roi >= 0
                                                                    ? "+"
                                                                    : ""}
                                                                {roi.toFixed(
                                                                    2
                                                                )}
                                                                %
                                                            </span>

                                                        </div>

                                                    </div>

                                                );

                                            }
                                        )}

                                    </div>

                                </div>

                            )}

                        </div>


                        {/* ==================================================
                            FOOTER
                        ================================================== */}

                        <div
                            className="
                                shrink-0
                                border-t
                                border-white/[0.05]
                                bg-[#0b1428]
                                px-6
                                py-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    flex-col-reverse
                                    gap-3
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
                            >

                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Existing holdings will be updated with the latest Angel One values.
                                </p>


                                <div
                                    className="
                                        flex
                                        justify-end
                                        gap-3
                                    "
                                >

                                    <button
                                        type="button"
                                        onClick={
                                            onClose
                                        }
                                        disabled={
                                            isBusy
                                        }
                                        className="
                                            rounded-xl
                                            border
                                            border-white/[0.06]
                                            bg-white/5
                                            px-5
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            text-slate-300
                                            transition
                                            hover:bg-white/10
                                            hover:text-white
                                            disabled:cursor-not-allowed
                                            disabled:opacity-40
                                        "
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="button"
                                        onClick={
                                            onConfirm
                                        }
                                        disabled={
                                            isBusy ||
                                            holdings.length === 0
                                        }
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-emerald-500
                                            px-5
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            text-white
                                            shadow-lg
                                            shadow-emerald-500/10
                                            transition
                                            hover:bg-emerald-400
                                            disabled:cursor-not-allowed
                                            disabled:opacity-50
                                        "
                                    >

                                        {importLoading ? (

                                            <>
                                                <span
                                                    className="
                                                        h-4
                                                        w-4
                                                        animate-spin
                                                        rounded-full
                                                        border-2
                                                        border-white/30
                                                        border-t-white
                                                    "
                                                />

                                                Importing...

                                            </>

                                        ) : (

                                            <>
                                                <FaUpload />

                                                Import {holdings.length} Holdings
                                            </>

                                        )}

                                    </button>

                                </div>

                            </div>

                        </div>

                    </>

                )}

            </div>

        </div>

    );

};


export default InvestmentImportPreviewModal;