const InvestmentPagination = ({
    currentPage,
    totalPages,
    pageSize,
    setPageSize,
    totalItems,
    startIndex,
    endIndex,
    onPrevious,
    onNext,
}) => {

    return (

        <div
            className="
                mt-4
                rounded-2xl
                border
                border-white/[0.04]
                bg-[#0b1428]
                px-5
                py-4
                shadow-lg
                shadow-black/10
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* ==================================================
                    INFO
                ================================================== */}

                <div
                    className="
                        text-sm
                        text-slate-500
                    "
                >

                    Showing

                    <span
                        className="
                            mx-1
                            font-semibold
                            text-slate-300
                        "
                    >
                        {totalItems === 0
                            ? 0
                            : startIndex + 1}
                    </span>

                    to

                    <span
                        className="
                            mx-1
                            font-semibold
                            text-slate-300
                        "
                    >
                        {endIndex}
                    </span>

                    of

                    <span
                        className="
                            mx-1
                            font-semibold
                            text-slate-300
                        "
                    >
                        {totalItems}
                    </span>

                    investments

                </div>


                {/* ==================================================
                    CONTROLS
                ================================================== */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                    "
                >

                    <select
                        value={
                            pageSize
                        }
                        onChange={(
                            event
                        ) =>
                            setPageSize(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                        className="
                            rounded-lg
                            border
                            border-white/[0.06]
                            bg-[#071126]
                            px-3
                            py-2
                            text-sm
                            text-slate-300
                            outline-none
                        "
                    >

                        <option value={10}>
                            10
                        </option>

                        <option value={25}>
                            25
                        </option>

                        <option value={50}>
                            50
                        </option>

                        <option value={100}>
                            100
                        </option>

                    </select>


                    <button
                        type="button"
                        onClick={
                            onPrevious
                        }
                        disabled={
                            currentPage === 1
                        }
                        className="
                            rounded-lg
                            border
                            border-white/[0.06]
                            bg-[#071126]
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-slate-300
                            transition
                            hover:bg-[#101c35]
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Previous
                    </button>


                    <span
                        className="
                            rounded-lg
                            bg-blue-500/10
                            px-3
                            py-2
                            text-sm
                            font-semibold
                            text-blue-400
                        "
                    >
                        Page {currentPage} of {totalPages}
                    </span>


                    <button
                        type="button"
                        onClick={
                            onNext
                        }
                        disabled={
                            currentPage === totalPages
                        }
                        className="
                            rounded-lg
                            border
                            border-white/[0.06]
                            bg-[#071126]
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-slate-300
                            transition
                            hover:bg-[#101c35]
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );

};


export default InvestmentPagination;