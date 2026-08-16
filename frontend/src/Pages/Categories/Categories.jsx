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

import {
    fetchCategories,
} from "../../features/category/categorySlice";

const Categories = () => {

    const dispatch = useDispatch();

    const [openModal, setOpenModal] =
        useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [type, setType] =
        useState("");

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
            .sort((a, b) =>
                a.name.localeCompare(b.name)
            );

    return (

        <DashboardLayout>

            <div className="finance-page space-y-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold text-white">

                            Categories

                        </h1>

                        <p className="text-slate-400 mt-2">

                            Manage all your financial categories.

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={handleAdd}
                        className="finance-add-button"
                    >
                        + Add Category
                    </button>

                </div>

                <CategorySummaryCards
                    categories={categories}
                />

                <CategoryFilters
                    search={search}
                    setSearch={setSearch}
                    type={type}
                    setType={setType}
                />

                <div className="space-y-8">

                    {loading && (

                        <div className="bg-[#0f1b2d] border border-blue-900/40 rounded-xl shadow-md p-8 text-center">

                            <p className="text-slate-400">

                                Loading categories...

                            </p>

                        </div>

                    )}

                    {error && (

                        <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-6">

                            <p className="text-red-400">

                                {error}

                            </p>

                        </div>

                    )}

                    {!loading && !error && (

                        <CategoryTable
                            categories={
                                filteredCategories
                            }
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    )}

                </div>

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