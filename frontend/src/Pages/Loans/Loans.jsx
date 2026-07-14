import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import LoanSummaryCards from "../../components/loans/LoanSummaryCards";
import LoanTable from "../../components/loans/LoanTable";
import LoanFormModal from "../../components/loans/LoanFormModal";
import DeleteLoanModal from "../../components/loans/DeleteLoanModal";
import LoanFilters from "../../components/loans/LoanFilters";
import LoanDistributionChart from "../../components/loans/LoanDistributionChart";
import LoanAnalyticsChart from "../../components/loans/LoanAnalyticsChart";

import {
    fetchLoans,
} from "../../features/loan/loanSlice";
import LoanPagination from "../../components/loans/LoanPagination";

const Loans = () => {

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    const [selectedLoan, setSelectedLoan] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [search, setSearch] = useState("");

    const [type, setType] = useState("");

    const [lender, setLender] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const {

        loans,

        loading,

        error,

    } = useSelector(
        (state) => state.loan
    );

    useEffect(() => {

        dispatch(fetchLoans());

    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    },[
        search,
        type,
        lender,
    ]);

    const handleAdd = () => {
        setSelectedLoan(null);
        setOpenModal(true);
    };

    const handleEdit = (loan) => {
        setSelectedLoan(loan);
        setOpenModal(true);
    };

    const handleDelete = (loan) => {
        setSelectedLoan(loan);
        setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedLoan(null);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedLoan(null);
    };

    const handlePreviousPage = () => {
        if(currentPage > 1){
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const filteredLoans = loans.filter((loan) => {
        const matchesSearch = loan.loanName.toLowerCase().includes(search.toLowerCase()) || loan.lender.toLowerCase().includes(search.toLowerCase());

        const matchesType = type === "" || loan.type === type;

        const matchesLender = lender === "" || loan.lender.toLowerCase().includes(lender.toLowerCase());

        return (
            matchesSearch && matchesType && matchesLender
        )
    });

    const totalPages = Math.max(
        1, Math.ceil(filteredLoans.length / pageSize)
    );

    const startIndex = (currentPage - 1) * pageSize;

    const endIndex = startIndex + pageSize;

    const paginatedLoans = filteredLoans.slice(startIndex, endIndex);

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        Loans

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage all your loans.

                    </p>

                </div>

                <LoanFilters
                    search={search}
                    setSearch={setSearch}
                    type={type}
                    setType={setType}
                    lender={lender}
                    setLender={setLender}
                    onAdd={handleAdd}
                />

                <LoanSummaryCards
                    loans={loans}
                />

                <LoanTable
                    loans={paginatedLoans}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <LoanPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalItems={filteredLoans.length}
                    startIndex={startIndex}
                    endIndex={Math.min(endIndex, filteredLoans.length)}
                    onPrevious={handlePreviousPage}
                    onNext={handleNextPage}
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <LoanDistributionChart
                        loans={filteredLoans}
                    />

                    <LoanAnalyticsChart
                        loans={filteredLoans}
                    />
                    
                </div>

                <DeleteLoanModal
                    open={deleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    loan={selectedLoan}
                />

                {loading && (

                    <p>

                        Loading...

                    </p>

                )}

                {error && (

                    <p className="text-red-500">

                        {error}

                    </p>

                )}

                <LoanFormModal
                    open={openModal}
                    onClose={handleCloseModal}
                    mode={
                        selectedLoan ? "edit" : "add"
                    }
                    loan={selectedLoan}
                />

            </div>

        </DashboardLayout>

    );

};

export default Loans;