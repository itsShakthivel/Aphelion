import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import InsuranceSummaryCards from "../../components/insurance/InsuranceSummaryCards";
import InsuranceTable from "../../components/insurance/InsuranceTable";
import InsuranceFormModal from "../../components/insurance/InsuranceFormModal";
import DeleteInsuranceModal from "../../components/insurance/DeleteInsuranceModal";
import InsuranceFilters from "../../components/insurance/InsuranceFilters";
import InsurancePagination from "../../components/insurance/InsurancePagination";
import CoverageDistributionChart from "../../components/insurance/CoverageDistributionChart";
import RenewalTimelineChart from "../../components/insurance/RenewalTimelineChart";

import {
    fetchInsurances,
} from "../../features/insurance/insuranceSlice";


const Insurance = () => {

    const dispatch = useDispatch();


    const [openModal, setOpenModal] = useState(false);

    const [selectedInsurance, setSelectedInsurance] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);


    const [search, setSearch] = useState("");

    const [type, setType] = useState("");

    const [status, setStatus] = useState("");


    const [curretPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] = useState(10);


    const {
        insurances,
        loading,
        error,
    } = useSelector(
        (state) => state.insurance
    );


    /* ==========================================
       FETCH
    ========================================== */

    useEffect(() => {

        dispatch(fetchInsurances());

    }, [dispatch]);


    /* ==========================================
       RESET PAGE
    ========================================== */

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        type,
        status,
    ]);


    /* ==========================================
       HANDLERS
    ========================================== */

    const handleAdd = () => {

        setSelectedInsurance(null);

        setOpenModal(true);

    };


    const handleEdit = (insurance) => {

        setSelectedInsurance(insurance);

        setOpenModal(true);

    };


    const handleDelete = (insurance) => {

        setSelectedInsurance(insurance);

        setDeleteModalOpen(true);

    };


    const handleCloseModal = () => {

        setOpenModal(false);

        setSelectedInsurance(null);

    };


    const handleCloseDeleteModal = () => {

        setDeleteModalOpen(false);

        setSelectedInsurance(null);

    };


    /* ==========================================
       PAGINATION
    ========================================== */

    const handlePreviousPage = () => {

        if (curretPage > 1) {

            setCurrentPage(
                (prev) => prev - 1
            );

        }

    };


    const handleNextPage = () => {

        if (curretPage < totalPages) {

            setCurrentPage(
                (prev) => prev + 1
            );

        }

    };


    /* ==========================================
       FILTER
    ========================================== */

    const filteredInsurances =
        insurances.filter((insurance) => {

            const matchesSearch =

                insurance.policyName
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                insurance.provider
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchesType =
                type === "" ||
                insurance.type === type;


            let insuranceStatus = "active";


            const today = new Date();

            const expiry =
                new Date(
                    insurance.expiryDate
                );


            const days = Math.ceil(
                (
                    expiry - today
                ) /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


            if (days < 0) {

                insuranceStatus =
                    "expired";

            }

            else if (days <= 30) {

                insuranceStatus =
                    "expiring";

            }


            const matchesStatus =
                status === "" ||
                insuranceStatus === status;


            return (
                matchesSearch &&
                matchesType &&
                matchesStatus
            );

        });


    /* ==========================================
       PAGINATION DATA
    ========================================== */

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredInsurances.length /
            pageSize
        )
    );


    const startIndex =
        (curretPage - 1) *
        pageSize;


    const endIndex =
        startIndex +
        pageSize;


    const paginatedInsurances =
        filteredInsurances.slice(
            startIndex,
            endIndex
        );


    return (

        <DashboardLayout>

            <div className="finance-page space-y-8">


                {/* HEADER */}

                <div>

                    <h1 className="text-3xl font-bold">

                        Insurance

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage all your insurance policies.

                    </p>

                </div>


                {/* SUMMARY */}

                <InsuranceSummaryCards
                    insurances={insurances}
                />


                {/* FILTERS */}

                <InsuranceFilters

                    search={search}
                    setSearch={setSearch}

                    type={type}
                    setType={setType}

                    status={status}
                    setStatus={setStatus}

                    onAdd={handleAdd}

                />


                {/* TABLE */}

                <InsuranceTable

                    insurances={
                        paginatedInsurances
                    }

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />


                {/* PAGINATION */}

                <InsurancePagination

                    curretPage={curretPage}

                    totalPages={totalPages}

                    pageSize={pageSize}

                    setPageSize={setPageSize}

                    totalItems={
                        filteredInsurances.length
                    }

                    startIndex={startIndex}

                    endIndex={
                        Math.min(
                            endIndex,
                            filteredInsurances.length
                        )
                    }

                    onPrevious={
                        handlePreviousPage
                    }

                    onNext={
                        handleNextPage
                    }

                />


                {/* CHARTS */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                    <CoverageDistributionChart
                        insurances={
                            filteredInsurances
                        }
                    />

                    <RenewalTimelineChart
                        insurances={
                            filteredInsurances
                        }
                    />

                </div>


                {/* DELETE MODAL */}

                <DeleteInsuranceModal

                    open={deleteModalOpen}

                    onClose={
                        handleCloseDeleteModal
                    }

                    insurance={
                        selectedInsurance
                    }

                />


                {/* LOADING */}

                {loading && (

                    <p className="text-gray-500">

                        Loading...

                    </p>

                )}


                {/* ERROR */}

                {error && (

                    <p className="text-red-500">

                        {error}

                    </p>

                )}


                {/* FORM MODAL */}

                <InsuranceFormModal

                    open={openModal}

                    onClose={handleCloseModal}

                    mode={
                        selectedInsurance
                            ? "edit"
                            : "add"
                    }

                    insurance={
                        selectedInsurance
                    }

                />

            </div>

        </DashboardLayout>

    );

};

export default Insurance;