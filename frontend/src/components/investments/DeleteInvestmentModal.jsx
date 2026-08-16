import { useDispatch } from "react-redux";

import {
    removeInvestment,
} from "../../features/investment/investmentSlice";


const DeleteInvestmentModal = ({
    open,
    onClose,
    investment,
}) => {

    const dispatch =
        useDispatch();


    if (
        !open ||
        !investment
    ) {

        return null;

    }


    const handleDelete = async () => {

        await dispatch(
            removeInvestment(
                investment._id
            )
        );

        onClose();

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

            <div
                className="
                    w-full
                    max-w-md
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-[#0b1428]
                    p-6
                    shadow-2xl
                    shadow-black/50
                "
            >

                {/* ==================================================
                    ICON
                ================================================== */}

                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500/10
                        text-xl
                        font-bold
                        text-red-400
                    "
                >
                    !
                </div>


                {/* ==================================================
                    TITLE
                ================================================== */}

                <h2
                    className="
                        mt-5
                        text-xl
                        font-bold
                        text-white
                    "
                >
                    Delete Investment
                </h2>


                {/* ==================================================
                    MESSAGE
                ================================================== */}

                <p
                    className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-400
                    "
                >
                    Are you sure you want to delete{" "}

                    <span
                        className="
                            font-semibold
                            text-white
                        "
                    >
                        {investment.name}
                    </span>

                    ?
                </p>


                <p
                    className="
                        mt-2
                        text-xs
                        text-slate-500
                    "
                >
                    This action cannot be undone.
                </p>


                {/* ==================================================
                    ACTIONS
                ================================================== */}

                <div
                    className="
                        mt-7
                        flex
                        justify-end
                        gap-3
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
                        type="button"
                        onClick={
                            handleDelete
                        }
                        className="
                            rounded-xl
                            bg-red-500
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-red-500/10
                            transition
                            hover:bg-red-400
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

};


export default DeleteInvestmentModal;