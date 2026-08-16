import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";

import InvestmentSummaryCards from "../../components/investments/InvestmentSummaryCards";
import InvestmentTable from "../../components/investments/InvestmentTable";
import InvestmentFormModal from "../../components/investments/InvestmentFormModal";
import DeleteInvestmentModal from "../../components/investments/DeleteInvestmentModal";
import InvestmentFilters from "../../components/investments/InvestmentFilters";
import InvestmentPagination from "../../components/investments/InvestmentPagination";
import PortfolioAllocationChart from "../../components/investments/PortfolioAllocationChart";
import InvestmentGrowthChart from "../../components/investments/InvestmentGrowthChart";
import InvestmentImportPreviewModal from "../../components/investments/InvestmentImportPreviewModal";

import {
    fetchInvestments,
    previewInvestmentImport,
    confirmInvestmentImport,
    clearInvestmentImportPreview,
    clearInvestmentImportResult,
} from "../../features/investment/investmentSlice";


const Investments = () => {

    const dispatch = useDispatch();

    const [openModal, setOpenModal] =
        useState(false);

    const [selectedInvestment, setSelectedInvestment] =
        useState(null);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [importModalOpen, setImportModalOpen] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [type, setType] =
        useState("");

    const [sortBy, setSortBy] =
        useState("latest");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [pageSize, setPageSize] =
        useState(10);

    const {
        investments = [],
        loading,
        error,
        importPreview,
        importPreviewLoading,
        importPreviewError,
        importLoading,
        importError,
    } = useSelector(
        (state) => state.investment
    );


    useEffect(() => {

        dispatch(
            fetchInvestments()
        );

    }, [dispatch]);


    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        type,
        sortBy,
    ]);


    const handleAdd = () => {

        setSelectedInvestment(null);

        setOpenModal(true);

    };


    const handleEdit = (
        investment
    ) => {

        setSelectedInvestment(
            investment
        );

        setOpenModal(true);

    };


    const handleDelete = (
        investment
    ) => {

        setSelectedInvestment(
            investment
        );

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


    const handleUploadXLSX = async (
        event
    ) => {

        const file =
            event.target.files?.[0];

        event.target.value = "";

        if (!file) {
            return;
        }

        const isExcel =
            file.name
                .toLowerCase()
                .endsWith(".xlsx");

        if (!isExcel) {
            return;
        }

        setImportModalOpen(true);

        await dispatch(
            previewInvestmentImport(
                file
            )
        );

    };


    const handleConfirmImport = async () => {

        if (!importPreview) {
            return;
        }

        const data =
            importPreview.data ||
            importPreview;

        const holdings =
            data.holdings;

        if (
            !Array.isArray(
                holdings
            ) ||
            holdings.length === 0
        ) {
            return;
        }

        const result =
            await dispatch(
                confirmInvestmentImport(
                    holdings
                )
            );

        if (
            confirmInvestmentImport.fulfilled.match(
                result
            )
        ) {

            setImportModalOpen(false);

            dispatch(
                clearInvestmentImportPreview()
            );

        }

    };


    const handleCloseImportModal = () => {

        if (importLoading) {
            return;
        }

        setImportModalOpen(false);

        dispatch(
            clearInvestmentImportPreview()
        );

        dispatch(
            clearInvestmentImportResult()
        );

    };


    const filteredInvestments =
        [...investments]
            .filter(
                (investment) => {

                    const name =
                        String(
                            investment.name || ""
                        )
                            .toLowerCase();

                    const searchValue =
                        search
                            .toLowerCase()
                            .trim();

                    const matchesSearch =
                        name.includes(
                            searchValue
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

                        case "nameAsc":

                            return String(
                                a.name || ""
                            ).localeCompare(
                                String(
                                    b.name || ""
                                )
                            );

                        case "nameDesc":

                            return String(
                                b.name || ""
                            ).localeCompare(
                                String(
                                    a.name || ""
                                )
                            );

                        case "profit": {

                            const profitA =
                                (
                                    Number(
                                        a.currentValue
                                    ) || 0
                                ) -
                                (
                                    Number(
                                        a.investedAmount
                                    ) || 0
                                );

                            const profitB =
                                (
                                    Number(
                                        b.currentValue
                                    ) || 0
                                ) -
                                (
                                    Number(
                                        b.investedAmount
                                    ) || 0
                                );

                            return (
                                profitB -
                                profitA
                            );

                        }

                        case "roi": {

                            const investedA =
                                Number(
                                    a.investedAmount
                                ) || 0;

                            const investedB =
                                Number(
                                    b.investedAmount
                                ) || 0;

                            const profitA =
                                (
                                    Number(
                                        a.currentValue
                                    ) || 0
                                ) -
                                investedA;

                            const profitB =
                                (
                                    Number(
                                        b.currentValue
                                    ) || 0
                                ) -
                                investedB;

                            const roiA =
                                investedA > 0
                                    ? (
                                        profitA /
                                        investedA
                                    )
                                    : 0;

                            const roiB =
                                investedB > 0
                                    ? (
                                        profitB /
                                        investedB
                                    )
                                    : 0;

                            return (
                                roiB -
                                roiA
                            );

                        }

                        case "latest":

                        default:

                            return (
                                new Date(
                                    b.purchaseDate || 0
                                ) -
                                new Date(
                                    a.purchaseDate || 0
                                )
                            );

                    }

                }
            );


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
        ) *
        pageSize;


    const endIndex =
        startIndex +
        pageSize;


    const paginatedInvestments =
        filteredInvestments.slice(
            startIndex,
            endIndex
        );


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


    return (

        <DashboardLayout>

            <div
                className="
                    finance-page
                    space-y-6
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    "
                >

                    <div>

                        <h1
                            className="
                                text-3xl
                                font-bold
                                text-white
                            "
                        >
                            Investments
                        </h1>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-400
                            "
                        >
                            Manage your investment portfolio.
                        </p>

                    </div>


                    <div
                        className="
                            flex
                            w-full
                            flex-col
                            gap-3
                            sm:w-auto
                            sm:flex-row
                        "
                    >

                        <label
                            className="
                                inline-flex
                                w-full
                                cursor-pointer
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-white/[0.06]
                                bg-[#0b1428]
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-300
                                shadow-lg
                                shadow-black/10
                                transition
                                hover:border-blue-500/20
                                hover:bg-[#0d1830]
                                hover:text-white
                                sm:w-auto
                            "
                        >

                            <FaUpload
                                className="
                                    text-blue-400
                                "
                            />

                            Upload XLSX

                            <input
                                type="file"
                                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                className="hidden"
                                onChange={
                                    handleUploadXLSX
                                }
                            />

                        </label>


                        <button
                            type="button"
                            onClick={
                                handleAdd
                            }
                            className="
                                w-full
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
                                active:scale-[0.98]
                                sm:w-auto
                            "
                        >
                            + Add Investment
                        </button>

                    </div>

                </div>


                <InvestmentSummaryCards
                    investments={
                        investments
                    }
                />


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

                />


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


                <InvestmentImportPreviewModal

                    open={
                        importModalOpen
                    }

                    preview={
                        importPreview
                    }

                    loading={
                        importPreviewLoading
                    }

                    importLoading={
                        importLoading
                    }

                    error={
                        importPreviewError ||
                        importError
                    }

                    onClose={
                        handleCloseImportModal
                    }

                    onConfirm={
                        handleConfirmImport
                    }

                />


                {loading && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/5
                            bg-[#0b1428]
                            px-5
                            py-4
                            text-sm
                            text-slate-400
                        "
                    >
                        Loading investments...
                    </div>

                )}


                {error && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            px-5
                            py-4
                            text-sm
                            text-red-400
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