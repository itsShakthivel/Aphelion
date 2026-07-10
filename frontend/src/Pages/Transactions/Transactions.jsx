import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTransactions } from "../../features/transaction/transactionSlice";

import DashboardLayout from "../../layouts/DashboardLayout";

import TransactionSummaryCards from "../../components/transactions/TransactionSummaryCards";
import TransactionFilters from "../../components/transactions/TransactionFilters";
import TransactionTable from "../../components/transactions/TransactionTable";
import TransactionFormModal from "../../components/transactions/TransactionFormModal";
import DeleteTransactionModal from "../../components/transactions/DeleteTransactionModal";
import TransactionPagination from "../../components/transactions/TransactionPagination";

const Transactions = () => {
    const dispatch = useDispatch();

    const {
        transactions,
        loading,
        error,
    } = useSelector((state) => state.transaction);

    // ==========================
    // Filter States
    // ==========================

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sortBy, setSortBy] = useState("latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // ==========================
    // Modal States
    // ==========================

    const [openModal, setOpenModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // ==========================
    // Fetch Transactions
    // ==========================

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        type,
        category,
        startDate,
        endDate,
        sortBy,
    ]);

    // ==========================
    // Handlers
    // ==========================

    const handleAdd = () => {
        setSelectedTransaction(null);
        setOpenModal(true);
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setOpenModal(true);
    };

    const handleView = (transaction) => {
        console.log("View Transaction:", transaction);
    };

    const handleDelete = (transaction) => {
        setSelectedTransaction(transaction);
        setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTransaction(null);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedTransaction(null);
    };

    // ==========================
    // Active Filters
    // ==========================

    const hasFilters = Boolean(
        search ||
        type ||
        category ||
        startDate ||
        endDate
    );

    // ==========================
    // Filter + Sort
    // ==========================

    const filteredTransactions = useMemo(() => {

        const searchTerm = search.trim().toLowerCase();

        const filtered = transactions.filter((transaction) => {

            const matchesSearch =
                transaction.description
                    ?.toLowerCase()
                    .includes(searchTerm) ||

                transaction.category?.name
                    ?.toLowerCase()
                    .includes(searchTerm);

            const matchesType =
                type === "" ||
                transaction.type === type;

            const matchesCategory =
                category === "" ||
                transaction.category?._id === category;

            const transactionDate = new Date(transaction.date);

            const matchesStartDate =
                !startDate ||
                transactionDate >= new Date(startDate);

            let matchesEndDate = true;

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);

                matchesEndDate =
                    transactionDate <= end;
            }

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory &&
                matchesStartDate &&
                matchesEndDate
            );

        });

        switch (sortBy) {

            case "latest":
                filtered.sort(
                    (a, b) =>
                        new Date(b.date) - new Date(a.date)
                );
                break;

            case "oldest":
                filtered.sort(
                    (a, b) =>
                        new Date(a.date) - new Date(b.date)
                );
                break;

            case "highest":
                filtered.sort(
                    (a, b) =>
                        b.amount - a.amount
                );
                break;

            case "lowest":
                filtered.sort(
                    (a, b) =>
                        a.amount - b.amount
                );
                break;

            default:
                break;

        }

        return filtered;

    }, [
        transactions,
        search,
        type,
        category,
        startDate,
        endDate,
        sortBy,
    ]);

    // Pagination Logic

    const totalPages = Math.ceil(
        filteredTransactions.length / pageSize
    );

    const startIndex = (currentPage - 1) * pageSize;

    const endIndex = startIndex + pageSize;

    const paginatedTransactions = filteredTransactions.slice(
        startIndex,
        endIndex
    );

    const handlePreviousPage = () => {
        if(currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if(currentPage < totalPages){
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-bold">
                        Transactions
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all your financial transactions.
                    </p>

                </div>

                {/* Summary Cards */}

                <TransactionSummaryCards
                    transactions={transactions}
                />

                {/* Filters */}

                <TransactionFilters
                    search={search}
                    setSearch={setSearch}

                    type={type}
                    setType={setType}

                    category={category}
                    setCategory={setCategory}

                    startDate={startDate}
                    setStartDate={setStartDate}

                    endDate={endDate}
                    setEndDate={setEndDate}

                    sortBy={sortBy}
                    setSortBy={setSortBy}

                    categories={[]}

                    onAdd={handleAdd}
                />

                {/* Table */}

                {loading ? (

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">

                        <p className="text-gray-500">
                            Loading transactions...
                        </p>

                    </div>

                ) : error ? (

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">

                        <p className="text-red-600">
                            {error}
                        </p>

                    </div>

                ) : (

                    <TransactionTable
                        transactions={paginatedTransactions}
                        hasFilters={hasFilters}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                )}

                <TransactionPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalItems={filteredTransactions.length}
                    startIndex={startIndex}
                    endIndex={Math.min(endIndex, filteredTransactions.length)}
                    onPrevious={handlePreviousPage}
                    onNext={handleNextPage}
                />

                {/* Add / Edit */}

                <TransactionFormModal
                    open={openModal}
                    onClose={handleCloseModal}
                    mode={selectedTransaction ? "edit" : "add"}
                    transaction={selectedTransaction}
                />

                {/* Delete */}

                <DeleteTransactionModal
                    open={deleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    transaction={selectedTransaction}
                />

            </div>

        </DashboardLayout>
    );
};

export default Transactions;