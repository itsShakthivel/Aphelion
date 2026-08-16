import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
    addInvestment,
    editInvestment,
} from "../../features/investment/investmentSlice";


const InvestmentFormModal = ({
    open,
    onClose,
    mode = "add",
    investment = null,
}) => {

    const dispatch = useDispatch();


    // ======================================================
    // FORM STATE
    // ======================================================

    const [formData, setFormData] =
        useState({

            name:
                "",

            type:
                "mutual_fund",

            category:
                "index_fund",

            investedAmount:
                "",

            currentValue:
                "",

            purchaseDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            notes:
                "",

        });


    // ======================================================
    // ADD RESET
    // ======================================================

    useEffect(() => {

        if (
            mode === "add" &&
            open
        ) {

            setFormData({

                name:
                    "",

                type:
                    "mutual_fund",

                category:
                    "index_fund",

                investedAmount:
                    "",

                currentValue:
                    "",

                purchaseDate:
                    new Date()
                        .toISOString()
                        .split("T")[0],

                notes:
                    "",

            });

        }

    }, [
        open,
        mode,
    ]);


    // ======================================================
    // EDIT LOAD
    // ======================================================

    useEffect(() => {

        if (
            mode === "edit" &&
            investment
        ) {

            setFormData({

                name:
                    investment.name ||
                    "",

                type:
                    investment.type ||
                    "mutual_fund",

                category:
                    investment.category ||
                    "other",

                investedAmount:
                    investment.investedAmount ??
                    "",

                currentValue:
                    investment.currentValue ??
                    "",

                purchaseDate:
                    investment.purchaseDate
                        ?.split("T")[0] ||
                    new Date()
                        .toISOString()
                        .split("T")[0],

                notes:
                    investment.notes ||
                    "",

            });

        }

    }, [
        mode,
        investment,
    ]);


    // ======================================================
    // CLOSE
    // ======================================================

    if (
        !open
    ) {

        return null;

    }


    // ======================================================
    // INPUT CHANGE
    // ======================================================

    const handleChange = (
        event
    ) => {

        setFormData(
            (previous) => ({

                ...previous,

                [event.target.name]:
                    event.target.value,

            })
        );

    };


    // ======================================================
    // TYPE CHANGE
    // ======================================================

    const handleTypeChange = (
        event
    ) => {

        const newType =
            event.target.value;


        setFormData(
            (previous) => ({

                ...previous,

                type:
                    newType,

                category:
                    newType ===
                    "mutual_fund"

                        ? (
                            previous.category ||
                            "other"
                        )

                        : "other",

            })
        );

    };


    // ======================================================
    // SUBMIT
    // ======================================================

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();


        if (
            !formData.name.trim()
        ) {

            toast.error(
                "Investment name is required"
            );

            return;

        }


        if (
            !formData.investedAmount
        ) {

            toast.error(
                "Invested amount is required"
            );

            return;

        }


        if (
            !formData.currentValue
        ) {

            toast.error(
                "Current value is required"
            );

            return;

        }


        try {

            const payload = {

                ...formData,

                investedAmount:
                    Number(
                        formData.investedAmount
                    ),

                currentValue:
                    Number(
                        formData.currentValue
                    ),

                category:
                    formData.type ===
                    "mutual_fund"

                        ? formData.category

                        : "other",

            };


            if (
                mode === "add"
            ) {

                await dispatch(

                    addInvestment(
                        payload
                    )

                ).unwrap();


                toast.success(
                    "Investment Added"
                );

            }

            else {

                await dispatch(

                    editInvestment({

                        id:
                            investment._id,

                        data:
                            payload,

                    })

                ).unwrap();


                toast.success(
                    "Investment Updated"
                );

            }


            onClose();

        }

        catch (error) {

            toast.error(
                error?.message ||
                error ||
                "Failed to save investment"
            );

        }

    };


    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                p-4
                backdrop-blur-sm
            "
        >

            {/* ==================================================
                MODAL
            ================================================== */}

            <div
                className="
                    max-h-[90vh]
                    w-full
                    max-w-lg
                    overflow-y-auto
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-[#0b1428]
                    shadow-2xl
                    shadow-black/50
                "
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div
                    className="
                        sticky
                        top-0
                        z-10
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/[0.05]
                        bg-[#0b1428]
                        px-6
                        py-5
                    "
                >

                    <div>

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            {mode === "add"
                                ? "Add Investment"
                                : "Edit Investment"}
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-slate-500
                            "
                        >
                            Add details about your investment holding.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-white/5
                            text-xl
                            text-slate-400
                            transition
                            hover:bg-white/10
                            hover:text-white
                        "
                    >
                        ×
                    </button>

                </div>


                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        space-y-5
                        p-6
                    "
                >

                    {/* ==================================================
                        NAME
                    ================================================== */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-xs
                                font-medium
                                text-slate-400
                            "
                        >
                            Investment Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Investment Name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/[0.06]
                                bg-[#071126]
                                px-4
                                py-3
                                text-sm
                                text-white
                                outline-none
                                placeholder:text-slate-600
                                focus:border-blue-500/50
                                focus:ring-2
                                focus:ring-blue-500/10
                            "
                        />

                    </div>


                    {/* ==================================================
                        TYPE + CATEGORY
                    ================================================== */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                        "
                    >

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-medium
                                    text-slate-400
                                "
                            >
                                Investment Type
                            </label>

                            <select
                                name="type"
                                value={
                                    formData.type
                                }
                                onChange={
                                    handleTypeChange
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/[0.06]
                                    bg-[#071126]
                                    px-4
                                    py-3
                                    text-sm
                                    text-slate-300
                                    outline-none
                                    focus:border-blue-500/50
                                    focus:ring-2
                                    focus:ring-blue-500/10
                                "
                            >

                                <option value="mutual_fund">
                                    Mutual Fund
                                </option>

                                <option value="stock">
                                    Stock
                                </option>

                                <option value="etf">
                                    ETF
                                </option>

                                <option value="gold">
                                    Gold
                                </option>

                                <option value="crypto">
                                    Crypto
                                </option>

                                <option value="fd">
                                    Fixed Deposit
                                </option>

                                <option value="real_estate">
                                    Real Estate
                                </option>

                                <option value="bond">
                                    Bond
                                </option>

                                <option value="other">
                                    Other
                                </option>

                            </select>

                        </div>


                        {formData.type ===
                            "mutual_fund" && (

                            <div>

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-xs
                                        font-medium
                                        text-slate-400
                                    "
                                >
                                    Fund Category
                                </label>

                                <select
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/[0.06]
                                        bg-[#071126]
                                        px-4
                                        py-3
                                        text-sm
                                        text-slate-300
                                        outline-none
                                        focus:border-blue-500/50
                                        focus:ring-2
                                        focus:ring-blue-500/10
                                    "
                                >

                                    <option value="index_fund">
                                        Index Fund
                                    </option>

                                    <option value="flexicap">
                                        Flexicap
                                    </option>

                                    <option value="large_cap">
                                        Large Cap
                                    </option>

                                    <option value="mid_cap">
                                        Mid Cap
                                    </option>

                                    <option value="small_cap">
                                        Small Cap
                                    </option>

                                    <option value="multicap">
                                        Multicap
                                    </option>

                                    <option value="elss">
                                        ELSS
                                    </option>

                                    <option value="debt">
                                        Debt
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        )}

                    </div>


                    {/* ==================================================
                        VALUES
                    ================================================== */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                        "
                    >

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-medium
                                    text-slate-400
                                "
                            >
                                Invested Amount
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="investedAmount"
                                placeholder="Invested Amount"
                                value={
                                    formData.investedAmount
                                }
                                onChange={
                                    handleChange
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/[0.06]
                                    bg-[#071126]
                                    px-4
                                    py-3
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-slate-600
                                    focus:border-blue-500/50
                                    focus:ring-2
                                    focus:ring-blue-500/10
                                "
                            />

                        </div>


                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-medium
                                    text-slate-400
                                "
                            >
                                Current Value
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="currentValue"
                                placeholder="Current Value"
                                value={
                                    formData.currentValue
                                }
                                onChange={
                                    handleChange
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/[0.06]
                                    bg-[#071126]
                                    px-4
                                    py-3
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-slate-600
                                    focus:border-blue-500/50
                                    focus:ring-2
                                    focus:ring-blue-500/10
                                "
                            />

                        </div>

                    </div>


                    {/* ==================================================
                        PURCHASE DATE
                    ================================================== */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-xs
                                font-medium
                                text-slate-400
                            "
                        >
                            Purchase Date
                        </label>

                        <input
                            type="date"
                            name="purchaseDate"
                            value={
                                formData.purchaseDate
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/[0.06]
                                bg-[#071126]
                                px-4
                                py-3
                                text-sm
                                text-slate-300
                                outline-none
                                focus:border-blue-500/50
                                focus:ring-2
                                focus:ring-blue-500/10
                            "
                        />

                    </div>


                    {/* ==================================================
                        NOTES
                    ================================================== */}

                    <div>

                        <label
                            className="
                                mb-2
                                block
                                text-xs
                                font-medium
                                text-slate-400
                            "
                        >
                            Notes
                        </label>

                        <textarea
                            name="notes"
                            placeholder="Optional notes..."
                            value={
                                formData.notes
                            }
                            onChange={
                                handleChange
                            }
                            rows={4}
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-white/[0.06]
                                bg-[#071126]
                                px-4
                                py-3
                                text-sm
                                text-white
                                outline-none
                                placeholder:text-slate-600
                                focus:border-blue-500/50
                                focus:ring-2
                                focus:ring-blue-500/10
                            "
                        />

                    </div>


                    {/* ==================================================
                        ACTIONS
                    ================================================== */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            border-t
                            border-white/[0.05]
                            pt-5
                        "
                    >

                        <button
                            type="button"
                            onClick={
                                onClose
                            }
                            className="
                                rounded-xl
                                border
                                border-white/[0.06]
                                bg-white/5
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-slate-300
                                transition
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="
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
                            "
                        >
                            {mode === "add"
                                ? "Add Investment"
                                : "Update Investment"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default InvestmentFormModal;