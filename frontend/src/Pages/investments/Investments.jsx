import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import InvestmentSummaryCards from "../../components/investments/InvestmentSummaryCards";
import InvestmentTable from "../../components/investments/InvestmentTable";
import InvestmentFormModal from "../../components/investments/InvestmentFormModal";
import DeleteInvestmentModal from "../../components/investments/DeleteInvestmentModal";
import InvestmentFilters from "../../components/investments/InvestmentFilters";
import InvestmentPagination from "../../components/investments/InvestmentPagination";
import PortfolioAllocationChart from "../../components/investments/PortfolioAllocationChart";
import InvestmentGrowthChart from "../../components/investments/InvestmentGrowthChart";

import {
    fetchInvestments,
} from "../../features/investment/investmentSlice";


const Investments = () => {

    const dispatch = useDispatch();


    // ======================================================
    // MODAL STATE
    // ======================================================

    const [openModal, setOpenModal] = useState(false);

    const [selectedInvestment, setSelectedInvestment] =
        useState(null);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);


    // ======================================================
    // FILTER STATE
    // ======================================================

    const [search, setSearch] = useState("");

    const [type, setType] = useState("");

    const [sortBy, setSortBy] = useState("latest");


    // ======================================================
    // PAGINATION STATE
    // ======================================================

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);


    // ======================================================
    // REDUX
    // ======================================================

    const {
        investments,
        loading,
        error,
    } = useSelector(
        (state) => state.investment
    );


    // ======================================================
    // FETCH INVESTMENTS
    // ======================================================

    useEffect(() => {

        dispatch(
            fetchInvestments()
        );

    }, [dispatch]);


    // ======================================================
    // RESET PAGINATION
    // ======================================================

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        type,
        sortBy,
    ]);


    // ======================================================
    // ADD INVESTMENT
    // ======================================================

    const handleAdd = () => {

        setSelectedInvestment(null);

        setOpenModal(true);

    };


    // ======================================================
    // EDIT INVESTMENT
    // ======================================================

    const handleEdit = (
        investment
    ) => {

        setSelectedInvestment(
            investment
        );

        setOpenModal(true);

    };


    // ======================================================
    // DELETE INVESTMENT
    // ======================================================

    const handleDelete = (
        investment
    ) => {

        setSelectedInvestment(
            investment
        );

        setDeleteModalOpen(true);

    };


    // ======================================================
    // CLOSE FORM MODAL
    // ======================================================

    const handleCloseModal = () => {

        setOpenModal(false);

        setSelectedInvestment(null);

    };


    // ======================================================
    // CLOSE DELETE MODAL
    // ======================================================

    const handleCloseDeleteModal = () => {

        setDeleteModalOpen(false);

        setSelectedInvestment(null);

    };


    // ======================================================
    // FILTER + SORT
    // ======================================================

    const filteredInvestments = [
        ...investments
    ]

        .filter(
            (investment) => {

                const investmentName =
                    String(
                        investment.name || ""
                    )
                        .toLowerCase();


                const matchesSearch =
                    investmentName.includes(
                        search.toLowerCase()
                    );


                const matchesType =
                    type === "" ||
                    investment.type === type;


                return (
                    matchesSearch &&
                    matchesType
                );

            }
        )

        .sort(
            (a, b) => {

                switch (sortBy) {

                    // ==================================
                    // NAME A-Z
                    // ==================================

                    case "nameAsc":

                        return (
                            String(a.name || "")
                                .localeCompare(
                                    String(b.name || "")
                                )
                        );


                    // ==================================
                    // NAME Z-A
                    // ==================================

                    case "nameDesc":

                        return (
                            String(b.name || "")
                                .localeCompare(
                                    String(a.name || "")
                                )
                        );


                    // ==================================
                    // HIGHEST PROFIT
                    // ==================================

                    case "profit":

                        return (

                            (
                                Number(
                                    b.currentValue
                                ) || 0
                            )

                            -

                            (
                                Number(
                                    b.investedAmount
                                ) || 0
                            )

                        )

                        -

                        (

                            (
                                Number(
                                    a.currentValue
                                ) || 0
                            )

                            -

                            (
                                Number(
                                    a.investedAmount
                                ) || 0
                            )

                        );


                    // ==================================
                    // HIGHEST ROI
                    // ==================================

                    case "roi": {

                        const investedA =
                            Number(
                                a.investedAmount
                            ) || 0;


                        const investedB =
                            Number(
                                b.investedAmount
                            ) || 0;


                        const roiA =
                            investedA > 0

                                ? (

                                    (
                                        (
                                            Number(
                                                a.currentValue
                                            ) || 0
                                        )

                                        -

                                        investedA
                                    )

                                    /

                                    investedA

                                ) * 100

                                : 0;


                        const roiB =
                            investedB > 0

                                ? (

                                    (
                                        (
                                            Number(
                                                b.currentValue
                                            ) || 0
                                        )

                                        -

                                        investedB
                                    )

                                    /

                                    investedB

                                ) * 100

                                : 0;


                        return (
                            roiB - roiA
                        );

                    }


                    // ==================================
                    // LATEST
                    // ==================================

                    case "latest":

                    default:

                        return (

                            new Date(
                                b.purchaseDate
                            )

                            -

                            new Date(
                                a.purchaseDate
                            )

                        );

                }

            }
        );


    // ======================================================
    // PAGINATION
    // ======================================================

    const totalPages =
        Math.max(

            1,

            Math.ceil(

                filteredInvestments.length /
                pageSize

            )

        );


    const startIndex =
        (
            currentPage - 1
        ) * pageSize;


    const endIndex =
        startIndex + pageSize;


    const paginatedInvestments =
        filteredInvestments.slice(
            startIndex,
            endIndex
        );


    // ======================================================
    // PREVIOUS PAGE
    // ======================================================

    const handlePreviousPage = () => {

        if (
            currentPage > 1
        ) {

            setCurrentPage(
                (previous) =>
                    previous - 1
            );

        }

    };


    // ======================================================
    // NEXT PAGE
    // ======================================================

    const handleNextPage = () => {

        if (
            currentPage < totalPages
        ) {

            setCurrentPage(
                (previous) =>
                    previous + 1
            );

        }

    };


    // ======================================================
    // UI
    // ======================================================

    return (

        <DashboardLayout>

            <div
                className="
                    min-h-full
                    space-y-6
                "
            >

                {/* ==================================================
                    PAGE HEADER
                ================================================== */}

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-800
                            "
                        >
                            Investments
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500
                            "
                        >
                            Manage and track your investment portfolio.
                        </p>

                    </div>


                    {/* ==============================================
                        ADD BUTTON
                    ============================================== */}

                    <button
                        onClick={handleAdd}
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
                            shadow-sm
                            transition
                            duration-200
                            hover:bg-emerald-600
                            hover:shadow-md
                            active:scale-[0.98]
                        "
                    >

                        <span
                            className="
                                text-lg
                                leading-none
                            "
                        >
                            +
                        </span>

                        Add Investment

                    </button>

                </div>


                {/* ==================================================
                    SUMMARY CARDS
                ================================================== */}

                <InvestmentSummaryCards
                    investments={
                        investments
                    }
                />


                {/* ==================================================
                    CHARTS
                ================================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-6
                        xl:grid-cols-2
                    "
                >

                    <PortfolioAllocationChart
                        investments={
                            filteredInvestments
                        }
                    />

                    <InvestmentGrowthChart
                        investments={
                            filteredInvestments
                        }
                    />

                </div>


                {/* ==================================================
                    FILTERS
                ================================================== */}

                <InvestmentFilters

                    search={
                        search
                    }

                    setSearch={
                        setSearch
                    }

                    type={
                        type
                    }

                    setType={
                        setType
                    }

                    sortBy={
                        sortBy
                    }

                    setSortBy={
                        setSortBy
                    }

                    onAdd={
                        handleAdd
                    }

                />


                {/* ==================================================
                    TABLE
                ================================================== */}

                <InvestmentTable

                    investments={
                        paginatedInvestments
                    }

                    onEdit={
                        handleEdit
                    }

                    onDelete={
                        handleDelete
                    }

                />


                {/* ==================================================
                    PAGINATION
                ================================================== */}

                <InvestmentPagination

                    currentPage={
                        currentPage
                    }

                    totalPages={
                        totalPages
                    }

                    pageSize={
                        pageSize
                    }

                    setPageSize={
                        setPageSize
                    }

                    totalItems={
                        filteredInvestments.length
                    }

                    startIndex={
                        startIndex
                    }

                    endIndex={

                        Math.min(
                            endIndex,
                            filteredInvestments.length
                        )

                    }

                    onPrevious={
                        handlePreviousPage
                    }

                    onNext={
                        handleNextPage
                    }

                />


                {/* ==================================================
                    ADD / EDIT MODAL
                ================================================== */}

                <InvestmentFormModal

                    open={
                        openModal
                    }

                    onClose={
                        handleCloseModal
                    }

                    mode={
                        selectedInvestment
                            ? "edit"
                            : "add"
                    }

                    investment={
                        selectedInvestment
                    }

                />


                {/* ==================================================
                    DELETE MODAL
                ================================================== */}

                <DeleteInvestmentModal

                    open={
                        deleteModalOpen
                    }

                    onClose={
                        handleCloseDeleteModal
                    }

                    investment={
                        selectedInvestment
                    }

                />


                {/* ==================================================
                    LOADING
                ================================================== */}

                {loading && (

                    <div
                        className="
                            rounded-xl
                            border
                            border-white/40
                            bg-white/60
                            px-5
                            py-3
                            text-sm
                            text-slate-500
                            shadow-sm
                            backdrop-blur-xl
                        "
                    >
                        Loading investments...
                    </div>

                )}


                {/* ==================================================
                    ERROR
                ================================================== */}

                {error && (

                    <div
                        className="
                            rounded-xl
                            border
                            border-red-200
                            bg-red-50/70
                            px-5
                            py-3
                            text-sm
                            text-red-600
                            shadow-sm
                            backdrop-blur-xl
                        "
                    >
                        {error}
                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};


export default Investments;