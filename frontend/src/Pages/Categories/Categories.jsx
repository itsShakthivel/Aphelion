import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import CategorySummaryCards from "../../components/categories/CategorySummaryCards";
import CategoryTable from "../../components/categories/CategoryTable";
import CategoryFormModal from "../../components/categories/CategoryFormModal";
import DeleteCategoryModal from "../../components/categories/DeleteCategoryModal";
import CategoryFilters from "../../components/categories/CategoryFilters";
import CategoryPagination from "../../components/categories/CategoryPagination";

import {
    fetchCategories,
} from "../../features/category/categorySlice";


const Categories = () => {

    const dispatch = useDispatch();


    // ==========================
    // Modal State
    // ==========================

    const [openModal, setOpenModal] =
        useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState(null);


    // ==========================
    // Filter State
    // ==========================

    const [search, setSearch] =
        useState("");

    const [type, setType] =
        useState("");

    const [sortBy, setSortBy] =
        useState("nameAsc");


    // ==========================
    // Pagination
    // ==========================

    const [currentPage, setCurrentPage] =
        useState(1);

    const [pageSize, setPageSize] =
        useState(10);


    // ==========================
    // Redux
    // ==========================

    const {
        categories,
        loading,
        error,
    } = useSelector(
        (state) => state.category
    );


    // ==========================
    // Fetch
    // ==========================

    useEffect(() => {

        dispatch(fetchCategories());

    }, [dispatch]);


    // ==========================
    // Reset Pagination
    // ==========================

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        type,
        sortBy,
    ]);


    // ==========================
    // Handlers
    // ==========================

    const handleEdit = (category) => {

        setSelectedCategory(category);

        setOpenModal(true);

    };


    const handleAdd = () => {

        setSelectedCategory(null);

        setOpenModal(true);

    };


    const handleDelete = (category) => {

        setSelectedCategory(category);

        setDeleteModalOpen(true);

    };


    const handleCloseDeleteModal = () => {

        setDeleteModalOpen(false);

        setSelectedCategory(null);

    };


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


    // ==========================
    // Filter + Sort
    // ==========================

    const filteredCategories =
        [...categories]

            .filter((category) => {

                const matchesSearch =
                    category.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );


                const matchesType =
                    type === "" ||
                    category.type === type;


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


                    case "type":

                        return a.type.localeCompare(
                            b.type
                        );


                    case "latest":

                        return (
                            new Date(b.createdAt) -
                            new Date(a.createdAt)
                        );


                    default:

                        return 0;

                }

            });


    // ==========================
    // Pagination Data
    // ==========================

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredCategories.length /
            pageSize
        )
    );


    const startIndex =
        (currentPage - 1) *
        pageSize;


    const endIndex =
        startIndex +
        pageSize;


    const paginatedCategories =
        filteredCategories.slice(
            startIndex,
            endIndex
        );


    // ==========================
    // UI
    // ==========================

    return (

        <DashboardLayout>

            <div className="finance-page space-y-8">


                {/* ==========================
                    Header
                ========================== */}

                <div>

                    <h1 className="text-3xl font-bold">

                        Categories

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Manage all your financial categories.

                    </p>

                </div>


                {/* ==========================
                    Summary
                ========================== */}

                <CategorySummaryCards
                    categories={categories}
                />


                {/* ==========================
                    Filters
                ========================== */}

                <CategoryFilters

                    search={search}
                    setSearch={setSearch}

                    type={type}
                    setType={setType}

                    sortBy={sortBy}
                    setSortBy={setSortBy}

                    onAdd={handleAdd}

                />


                {/* ==========================
                    Content
                ========================== */}

                <div className="space-y-8">


                    {loading && (

                        <div className="bg-white rounded-xl shadow-md p-8 text-center">

                            <p className="text-gray-500">

                                Loading categories...

                            </p>

                        </div>

                    )}


                    {error && (

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">

                            <p className="text-red-500">

                                {error}

                            </p>

                        </div>

                    )}


                    {!loading && !error && (

                        <CategoryTable

                            categories={
                                paginatedCategories
                            }

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />

                    )}

                </div>


                {/* ==========================
                    Pagination
                ========================== */}

                <CategoryPagination

                    currentPage={currentPage}

                    totalPages={totalPages}

                    pageSize={pageSize}

                    setPageSize={setPageSize}

                    totalItems={
                        filteredCategories.length
                    }

                    startIndex={startIndex}

                    endIndex={
                        Math.min(
                            endIndex,
                            filteredCategories.length
                        )
                    }

                    onPrevious={
                        handlePreviousPage
                    }

                    onNext={
                        handleNextPage
                    }

                />


                {/* ==========================
                    Form Modal
                ========================== */}

                <CategoryFormModal

                    open={openModal}

                    onClose={() => {

                        setOpenModal(false);

                        setSelectedCategory(null);

                    }}

                    mode={
                        selectedCategory
                            ? "edit"
                            : "add"
                    }

                    category={
                        selectedCategory
                    }

                />


                {/* ==========================
                    Delete Modal
                ========================== */}

                <DeleteCategoryModal

                    open={deleteModalOpen}

                    onClose={
                        handleCloseDeleteModal
                    }

                    category={
                        selectedCategory
                    }

                />

            </div>

        </DashboardLayout>

    );

};


export default Categories;