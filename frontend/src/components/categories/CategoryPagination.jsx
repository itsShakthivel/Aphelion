const CategoryPagination = ({
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

        <div className="bg-white rounded-xl shadow-md p-4 mt-6">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="text-gray-600">

                    Showing

                    <span className="font-semibold">
                        {" "}
                        {totalItems === 0 ? 0 : startIndex + 1}
                    </span>

                    {" "}to{" "}

                    <span className="font-semibold">

                        {endIndex}

                    </span>

                    {" "}of{" "}

                    <span className="font-semibold">

                        {totalItems}

                    </span>

                    {" "}categories

                </div>

                <div className="flex items-center gap-4">

                    <select
                        value={pageSize}
                        onChange={(e) =>
                            setPageSize(Number(e.target.value))
                        }
                        className="border rounded-lg px-3 py-2"
                    >

                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>

                    </select>

                    <button
                        onClick={onPrevious}
                        disabled={currentPage === 1}
                        className="border rounded-lg px-4 py-2 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="font-semibold">

                        Page {currentPage} of {totalPages}

                    </span>

                    <button
                        onClick={onNext}
                        disabled={currentPage === totalPages}
                        className="border rounded-lg px-4 py-2 disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );

};

export default CategoryPagination;