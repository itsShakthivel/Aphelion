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


    const [openModal, setOpenModal] = useState(false);

    const [selectedInvestment, setSelectedInvestment] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


    const [search, setSearch] = useState("");

    const [type, setType] = useState("");

    const [sortBy, setSortBy] = useState("latest");


    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);


    const {
        investments,
        loading,
        error,
    } = useSelector(
        (state) => state.investment
    );


    /* ==========================================
       FETCH INVESTMENTS
    ========================================== */

    useEffect(() => {

        dispatch(fetchInvestments());

    }, [dispatch]);


    /* ==========================================
       RESET PAGINATION
    ========================================== */

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        type,
        sortBy,
    ]);


    /* ==========================================
       MODAL HANDLERS
    ========================================== */

    const handleAdd = () => {

        setSelectedInvestment(null);

        setOpenModal(true);

    };


    const handleEdit = (investment) => {

        setSelectedInvestment(investment);

        setOpenModal(true);

    };


    const handleDelete = (investment) => {

        setSelectedInvestment(investment);

        setDeleteModalOpen(true);

    };


    const handleCloseModal = () => {

        setOpenModal(false);

        setSelectedInvestment(null);

    };


    const handleCloseDeleteModal = () => {

        setDeleteModalOpen(false);

        setSelectedInvestment(null);

    };


    /* ==========================================
       PAGINATION
    ========================================== */

    const handlePreviousPage = () => {

        if (currentPage > 1) {

            setCurrentPage(
                (prev) => prev - 1
            );

        }

    };


    const handleNextPage = () => {

        if (currentPage < totalPages) {

            setCurrentPage(
                (prev) => prev + 1
            );

        }

    };


    /* ==========================================
       FILTER + SORT
    ========================================== */

    const filteredInvestments = [...investments]
        .filter((investment) => {

            const matchesSearch =
                investment.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesType =
                type === "" ||
                investment.type === type;

            return (
                matchesSearch &&
                matchesType
            );

        })
        .sort((a, b) => {

            switch (sortBy) {

                case "nameAsc":

                    return a.name.localeCompare(
                        b.name
                    );


                case "nameDesc":

                    return b.name.localeCompare(
                        a.name
                    );


                case "profit":

                    return (
                        (
                            b.currentValue -
                            b.investedAmount
                        ) -
                        (
                            a.currentValue -
                            a.investedAmount
                        )
                    );


                case "roi": {

                    const roiA =
                        a.investedAmount
                            ? (
                                (
                                    a.currentValue -
                                    a.investedAmount
                                ) /
                                a.investedAmount
                            )
                            : 0;

                    const roiB =
                        b.investedAmount
                            ? (
                                (
                                    b.currentValue -
                                    b.investedAmount
                                ) /
                                b.investedAmount
                            )
                            : 0;

                    return roiB - roiA;

                }


                case "latest":

                default:

                    return (
                        new Date(
                            b.purchaseDate
                        ) -
                        new Date(
                            a.purchaseDate
                        )
                    );

            }

        });


    /* ==========================================
       PAGINATION DATA
    ========================================== */

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredInvestments.length /
            pageSize
        )
    );


    const startIndex =
        (currentPage - 1) *
        pageSize;


    const endIndex =
        startIndex +
        pageSize;


    const paginatedInvestments =
        filteredInvestments.slice(
            startIndex,
            endIndex
        );


    /* ==========================================
       UI
    ========================================== */

    return (

        <DashboardLayout>

            <div className="finance-page space-y-8">


                {/* =================================
                    HEADER
                ================================= */}

                <div>

                    <h1 className="text-3xl font-bold">

                        Investments

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Manage your investment portfolio.

                    </p>

                </div>


                {/* =================================
                    SUMMARY
                ================================= */}

                <InvestmentSummaryCards
                    investments={investments}
                />


                {/* =================================
                    FILTERS
                ================================= */}

                <InvestmentFilters

                    search={search}
                    setSearch={setSearch}

                    type={type}
                    setType={setType}

                    sortBy={sortBy}
                    setSortBy={setSortBy}

                    onAdd={handleAdd}

                />


                {/* =================================
                    TABLE
                ================================= */}

                <InvestmentTable

                    investments={
                        paginatedInvestments
                    }

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />


                {/* =================================
                    PAGINATION
                ================================= */}

                <InvestmentPagination

                    currentPage={currentPage}

                    totalPages={totalPages}

                    pageSize={pageSize}

                    setPageSize={setPageSize}

                    totalItems={
                        filteredInvestments.length
                    }

                    startIndex={startIndex}

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


                {/* =================================
                    CHARTS
                ================================= */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

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


                {/* =================================
                    MODALS
                ================================= */}

                <InvestmentFormModal

                    open={openModal}

                    onClose={handleCloseModal}

                    mode={
                        selectedInvestment
                            ? "edit"
                            : "add"
                    }

                    investment={
                        selectedInvestment
                    }

                />


                <DeleteInvestmentModal

                    open={deleteModalOpen}

                    onClose={
                        handleCloseDeleteModal
                    }

                    investment={
                        selectedInvestment
                    }

                />


                {/* =================================
                    LOADING
                ================================= */}

                {loading && (

                    <p className="text-gray-500">

                        Loading...

                    </p>

                )}


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <p className="text-red-500">

                        {error}

                    </p>

                )}

            </div>

        </DashboardLayout>

    );

};

export default Investments;