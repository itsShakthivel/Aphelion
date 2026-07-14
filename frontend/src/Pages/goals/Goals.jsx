import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";
import GoalSummaryCards from "../../components/goals/GoalSummaryCards";
import GoalTable from "../../components/goals/GoalTable";
import GoalFormModal from "../../components/goals/GoalFormModal";
import DeleteGoalModal from "../../components/goals/DeleteGoalModal";
import GoalFilters from "../../components/goals/GoalFilters";
import GoalAllocationChart from "../../components/goals/GoalAllocationChart";
import GoalProgressChart from "../../components/goals/GoalProgressChart";

import {
    fetchGoals,
} from "../../features/goal/goalSlice";
import GoalPagination from "../../components/goals/GoalPagination";

const Goals = () => {

    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    const [selectedGoal, setSelectedGoal] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const {

        goals,

        loading,

        error,

    } = useSelector(
        (state) => state.goal
    );

    useEffect(() => {

        dispatch(fetchGoals());

    }, [dispatch]);

    useEffect(() => {
      setCurrentPage(1);
    },[
      search,
      category,
    ]);

    const handleAdd = () => {
      setSelectedGoal(null);
      setOpenModal(true);
    };

    const handleEdit = (goal) => {
      setSelectedGoal(goal);
      setOpenModal(true);
    };

    const handleDelete = (goal) => {
      setSelectedGoal(goal);
      setDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedGoal(null);
    };

    const handleCloseDeleteModal = () => {
      setDeleteModalOpen(false);
      setSelectedGoal(null);
    };

    const handlePreviousPage = () => {
      if(currentPage > 1){
        setCurrentPage(prev => prev-1);
      }
    };

    const handleNextPage = () => {
      if(currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
      }
    };

    const filteredGoals = goals.filter((goal) => {
      const matchesSearch = goal.title.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "" || goal.category === category;

      return(
        matchesSearch && matchesCategory
      );
    });

    const totalPages = Math.max(
      1, Math.ceil(filteredGoals.length / pageSize)
    );

    const startIndex = (currentPage - 1) * pageSize;

    const endIndex = startIndex + pageSize;

    const paginatedGoals = filteredGoals.slice(
      startIndex, endIndex
    );

    

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        Financial Goals

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Track and manage your financial goals.

                    </p>

                </div>

                <GoalFilters
                  search={search}
                  setSearch={setSearch}
                  category={category}
                  setCategory={setCategory}
                  onAdd={handleAdd}
                />

                <GoalSummaryCards
                  goals={filteredGoals}
                />

                <GoalTable
                  goals={paginatedGoals}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                <GoalPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  totalItems={filteredGoals.length}
                  startIndex={startIndex}
                  endIndex={Math.min(endIndex, filteredGoals.length)}
                  onPrevious={handlePreviousPage}
                  onNext={handleNextPage}
                />

                <DeleteGoalModal
                  open={deleteModalOpen}
                  onClose={handleCloseDeleteModal}
                  goal={selectedGoal}
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

                <GoalFormModal
                  open={openModal}
                  onClose={handleCloseModal}
                  mode={
                    selectedGoal ? "edit" : "add"
                  }

                  goal={selectedGoal}
                />

            </div>

        </DashboardLayout>

    );

};

export default Goals;