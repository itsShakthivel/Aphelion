import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addTransaction,
    editTransaction,
} from "../../features/transaction/transactionSlice";

import {
    fetchCategories,
} from "../../features/category/categorySlice";

import {
    fetchInvestments,
} from "../../features/investment/investmentSlice";

import InvestmentTransactionOptions
    from "./InvestmentTransactionOptions";

import InvestmentSelector
    from "./InvestmentSelector";

import LoanTransactionOptions
    from "./LoanTransactionOptions";

import LoanSelector
    from "./LoanSelector";

import InsuranceTransactionOptions
    from "./InsuranceTransactionOptions";

import InsuranceSelector
    from "./InsuranceSelector";

const TransactionFormModal = ({
    open,
    onClose,
    mode = "add",
    transaction = null,
}) => {

    const dispatch = useDispatch();

    const {
        categories = [],
    } = useSelector(
        (state) =>
            state.category
    );

    const {
        investments = [],
        loading:
            investmentsLoading,
    } = useSelector(
        (state) =>
            state.investment
    );

    const [
        formData,
        setFormData,
    ] = useState({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        date:
            new Date()
                .toISOString()
                .split("T")[0],
    });

    const [
        investmentMode,
        setInvestmentMode,
    ] = useState("");

    const [
        investmentId,
        setInvestmentId,
    ] = useState("");

    const [
        loanTransactionType,
        setLoanTransactionType,
    ] = useState("");

    const [
        loanId,
        setLoanId,
    ] = useState("");

    const [
        insuranceTransactionType,
        setInsuranceTransactionType,
    ] = useState("");

    const [
        insuranceId,
        setInsuranceId,
    ] = useState("");

    useEffect(() => {

        if (
            open &&
            categories.length === 0
        ) {

            dispatch(
                fetchCategories()
            );

        }

    }, [
        dispatch,
        open,
        categories.length,
    ]);

    useEffect(() => {

        if (
            open &&
            investments.length === 0
        ) {

            dispatch(
                fetchInvestments()
            );

        }

    }, [
        dispatch,
        open,
        investments.length,
    ]);

    useEffect(() => {

        if (
            mode === "add" &&
            open
        ) {

            setFormData({
                amount: "",
                type: "expense",
                category: "",
                description: "",
                date:
                    new Date()
                        .toISOString()
                        .split("T")[0],
            });

            setInvestmentMode("");

            setInvestmentId("");

            setLoanTransactionType("");

            setLoanId("");

            setInsuranceTransactionType("");

            setInsuranceId("");

        }

    }, [
        open,
        mode,
    ]);

    useEffect(() => {

        if (
            mode === "edit" &&
            transaction
        ) {

            setFormData({
                amount:
                    transaction.amount ??
                    "",

                type:
                    transaction.type ??
                    "expense",

                category:
                    transaction.category?._id ||
                    "",

                description:
                    transaction.description ||
                    "",

                date:
                    transaction.date?.split(
                        "T"
                    )[0] ||
                    new Date()
                        .toISOString()
                        .split("T")[0],
            });

            setInvestmentMode(
                transaction.investmentMode ||
                ""
            );

            setInvestmentId(
                transaction.investmentId?._id ||
                transaction.investmentId ||
                ""
            );

            setLoanTransactionType(
                transaction.loanTransactionType ||
                ""
            );

            setLoanId(
                transaction.loanId?._id ||
                transaction.loanId ||
                ""
            );

            setInsuranceTransactionType(
                transaction.insuranceTransactionType ||
                ""
            );

            setInsuranceId(
                transaction.insuranceId?._id ||
                transaction.insuranceId ||
                ""
            );

        }

    }, [
        mode,
        transaction,
    ]);

    if (!open) {

        return null;

    }

    const isInvestment =
        formData.type ===
        "investment";

    const isLoan =
        formData.type ===
        "loan";

    const isInsurance =
        formData.type ===
        "insurance";

    const availableCategories =
        categories.filter(
            (category) =>
                category.type ===
                formData.type
        );

    const handleChange = (
        event
    ) => {

        const {
            name,
            value,
        } = event.target;

        if (
            name === "type"
        ) {

            setFormData(
                (previous) => ({
                    ...previous,
                    type: value,
                    category: "",
                })
            );

            setInvestmentMode("");

            setInvestmentId("");

            setLoanTransactionType("");

            setLoanId("");

            setInsuranceTransactionType("");

            setInsuranceId("");

            return;

        }

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );

    };

    const handleInvestmentModeChange =
        (
            value
        ) => {

            setInvestmentMode(
                value
            );

            setInvestmentId("");

        };

    const handleInvestmentChange =
        (
            value
        ) => {

            setInvestmentId(
                value
            );

        };

    const handleLoanTransactionTypeChange =
        (
            value
        ) => {

            setLoanTransactionType(
                value
            );

            setLoanId("");

        };

    const handleLoanChange = (
        value
    ) => {

        setLoanId(
            value
        );

    };

    const handleInsuranceTransactionTypeChange =
        (
            value
        ) => {

            setInsuranceTransactionType(
                value
            );

            setInsuranceId("");

        };

    const handleInsuranceChange = (
        value
    ) => {

        setInsuranceId(
            value
        );

    };

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        if (
            !formData.amount
        ) {

            toast.error(
                "Amount is required"
            );

            return;

        }

        if (
            !isLoan &&
            !isInsurance &&
            !formData.category
        ) {

            toast.error(
                "Please select a category"
            );

            return;

        }

        if (
            isInvestment &&
            !investmentMode
        ) {

            toast.error(
                "Please select an investment type"
            );

            return;

        }

        if (
            isInvestment &&
            !investmentId
        ) {

            toast.error(
                "Please select an investment"
            );

            return;

        }

        if (
            isLoan &&
            !loanTransactionType
        ) {

            toast.error(
                "Please select a loan transaction type"
            );

            return;

        }

        if (
            isLoan &&
            !loanId
        ) {

            toast.error(
                "Please select a loan"
            );

            return;

        }

        if (
            isInsurance &&
            !insuranceTransactionType
        ) {

            toast.error(
                "Please select an insurance transaction type"
            );

            return;

        }

        if (
            isInsurance &&
            !insuranceId
        ) {

            toast.error(
                "Please select an insurance policy"
            );

            return;

        }

        if (
            !formData.description.trim()
        ) {

            toast.error(
                "Description is required"
            );

            return;

        }

        try {

            const transactionData = {

                ...formData,

                ...(isInvestment
                    ? {
                        investmentMode,
                        investmentId,
                    }
                    : {
                        investmentMode: "",
                        investmentId: "",
                    }),

                ...(isLoan
                    ? {
                        loanTransactionType,
                        loanId,
                    }
                    : {
                        loanTransactionType: "",
                        loanId: "",
                    }),

                ...(isInsurance
                    ? {
                        insuranceTransactionType,
                        insuranceId,
                    }
                    : {
                        insuranceTransactionType: "",
                        insuranceId: "",
                    }),

            };

            if (
                isLoan ||
                isInsurance
            ) {

                transactionData.category =
                    "";

            }

            if (
                mode === "add"
            ) {

                await dispatch(
                    addTransaction(
                        transactionData
                    )
                ).unwrap();

                toast.success(
                    "Transaction Added"
                );

            } else {

                await dispatch(
                    editTransaction({
                        id:
                            transaction._id,

                        data:
                            transactionData,
                    })
                ).unwrap();

                toast.success(
                    "Transaction Updated"
                );

            }

            onClose();

        } catch (error) {

            toast.error(
                error?.message ||
                error ||
                "Something went wrong"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

                <h2 className="text-2xl font-bold mb-6">

                    {
                        mode === "add"
                            ? "Add Transaction"
                            : "Edit Transaction"
                    }

                </h2>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Amount

                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            name="amount"
                            placeholder="Enter amount"
                            value={
                                formData.amount
                            }
                            onChange={
                                handleChange
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Transaction Type

                        </label>

                        <select
                            name="type"
                            value={
                                formData.type
                            }
                            onChange={
                                handleChange
                            }
                            className="w-full border rounded-lg p-3"
                        >

                            <option value="income">
                                Income
                            </option>

                            <option value="expense">
                                Expense
                            </option>

                            <option value="saving">
                                Saving
                            </option>

                            <option value="investment">
                                Investment
                            </option>

                            <option value="loan">
                                Loan
                            </option>

                            <option value="insurance">
                                Insurance
                            </option>

                        </select>

                    </div>

                    {isInvestment && (

                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-5">

                            <div>

                                <p className="text-sm font-semibold text-emerald-700">

                                    Investment Transaction

                                </p>

                                <p className="text-sm text-emerald-600 mt-1">

                                    Choose the investment method and portfolio holding.

                                </p>

                            </div>

                            <InvestmentTransactionOptions
                                value={
                                    investmentMode
                                }
                                onChange={
                                    handleInvestmentModeChange
                                }
                            />

                            {investmentMode && (

                                <div>

                                    {investmentsLoading ? (

                                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">

                                            <p className="text-sm text-gray-500">

                                                Loading investments...

                                            </p>

                                        </div>

                                    ) : (

                                        <InvestmentSelector
                                            investments={
                                                investments
                                            }
                                            value={
                                                investmentId
                                            }
                                            onChange={
                                                handleInvestmentChange
                                            }
                                        />

                                    )}

                                </div>

                            )}

                        </div>

                    )}

                    {isLoan && (

                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-5">

                            <div>

                                <p className="text-sm font-semibold text-blue-700">

                                    Loan Transaction

                                </p>

                                <p className="text-sm text-blue-600 mt-1">

                                    Select the loan and the type of loan activity.

                                </p>

                            </div>

                            <LoanTransactionOptions
                                value={
                                    loanTransactionType
                                }
                                onChange={
                                    handleLoanTransactionTypeChange
                                }
                            />

                            {loanTransactionType && (

                                <LoanSelector
                                    value={
                                        loanId
                                    }
                                    onChange={
                                        handleLoanChange
                                    }
                                />

                            )}

                        </div>

                    )}

                    {isInsurance && (

                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-5">

                            <div>

                                <p className="text-sm font-semibold text-emerald-700">

                                    Insurance Transaction

                                </p>

                                <p className="text-sm text-emerald-600 mt-1">

                                    Select the insurance policy and transaction type.

                                </p>

                            </div>

                            <InsuranceTransactionOptions
                                value={
                                    insuranceTransactionType
                                }
                                onChange={
                                    handleInsuranceTransactionTypeChange
                                }
                            />

                            {insuranceTransactionType && (

                                <InsuranceSelector
                                    value={
                                        insuranceId
                                    }
                                    onChange={
                                        handleInsuranceChange
                                    }
                                />

                            )}

                        </div>

                    )}

                    {!isLoan &&
                        !isInsurance && (

                            <div>

                                <label className="block text-sm font-medium mb-2">

                                    Category

                                </label>

                                <select
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full border rounded-lg p-3"
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    {
                                        availableCategories.map(
                                            (
                                                category
                                            ) => (

                                                <option
                                                    key={
                                                        category._id
                                                    }
                                                    value={
                                                        category._id
                                                    }
                                                >

                                                    {
                                                        category.icon
                                                    }{" "}

                                                    {
                                                        category.name
                                                    }

                                                </option>

                                            )
                                        )
                                    }

                                </select>

                            </div>

                        )}

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Description

                        </label>

                        <textarea
                            name="description"
                            placeholder="Enter description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            rows="3"
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Date

                        </label>

                        <input
                            type="date"
                            name="date"
                            value={
                                formData.date
                            }
                            onChange={
                                handleChange
                            }
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={
                                onClose
                            }
                            className="px-5 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
                        >
                            {
                                mode === "add"
                                    ? "Add"
                                    : "Update"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default TransactionFormModal;