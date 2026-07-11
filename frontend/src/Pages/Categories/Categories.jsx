import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

    const [openModal, setOpenModal] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [search, setSearch] = useState("");

    const [type, setType] = useState("");

    const[sortBy, setSortBy] = useState("nameAsc");

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const {

        categories,

        loading,

        error,

    } = useSelector(
        (state) => state.category
    );

    useEffect(() => {

        dispatch(fetchCategories());

    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        type,
        sortBy,
    ]);

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
        if(currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const filteredCategories = [...categories].filter((category) =>{
        const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase());

        const matchesType = type === "" || category.type === type;

        return (
            matchesSearch && matchesType
        );
    }).sort((a, b) => {
        switch(sortBy) {
            case "nameAsc":
                return a.name.localeCompare(b.name)
            case "nameDesc":
                return b.name.localeComapre(a.name)
            case "type":
                return a.type.localeCompare(b.type)
            case "latest":
                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );
            default:
                return 0;
        }
    });

    const totalPages = Math.max(
        1, Math.ceil(filteredCategories.length / pageSize) 
    );

    const startIndex = (currentPage -1) * pageSize;

    const endIndex = startIndex + pageSize;

    const paginatedCategories = filteredCategories.slice(
        startIndex, endIndex
    );

    return (

        <DashboardLayout>

            <div>

                <h1 className="text-3xl font-bold">
                    Categories
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all your financial categories.
                </p>

                <div className="mt-8">
                    <CategorySummaryCards
                        categories={categories}
                    />
                </div>

                <CategoryFilters
                    search={search}
                    setSearch={setSearch}
                    type={type}
                    setType={setType}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onAdd={handleAdd}
                />

                <div className="space-y-8">

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

                    {!loading && !error && (

                        <CategoryTable
                            categories={paginatedCategories}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                        
                    )}

                    
                </div>

                <CategoryPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    totalItems={filteredCategories.length}
                    startIndex={startIndex}
                    endIndex={Math.min(
                        endIndex, filteredCategories.length
                    )}
                    onPrevious={handlePreviousPage}
                    onNext={handleNextPage}
                />

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
                    category={selectedCategory}
                />

                <DeleteCategoryModal
                    open={deleteModalOpen}
                    onClose={handleCloseDeleteModal}
                    category={selectedCategory}
                />

            </div>

        </DashboardLayout>

    );

};

export default Categories;