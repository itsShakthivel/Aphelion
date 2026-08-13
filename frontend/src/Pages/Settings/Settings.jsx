import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import {
    setThemeMode,
} from "../../features/theme/themeSlice";

import API from "../../api/axios";

const Settings = () => {

    const dispatch = useDispatch();

    // ============================================
    // Theme
    // ============================================

    const {
        mode,
    } = useSelector(

        state => state.theme

    );

    // ============================================
    // Household
    // ============================================

    const {
        family,
    } = useSelector(

        state => state.family

    );

    // ============================================
    // Auth
    // ============================================

    const {
        user,
    } = useSelector(

        state => state.auth

    );

    // ============================================
    // Household Form
    // ============================================

    const [familyName, setFamilyName] =
        useState("");

    const [familyDescription, setFamilyDescription] =
        useState("");

    const [savingFamily, setSavingFamily] =
        useState(false);

    const [familySuccess, setFamilySuccess] =
        useState("");

    const [familyError, setFamilyError] =
        useState("");

    // ============================================
    // Load Household Data
    // ============================================

    useEffect(() => {

        if (family) {

            setFamilyName(
                family.name || ""
            );

            setFamilyDescription(
                family.description || ""
            );

        }

    }, [family]);

    // ============================================
    // Determine Household Role
    // ============================================

    const currentMember =
        family?.members?.find(

            member => {

                const memberId =
                    member.user?._id ||
                    member.user;

                return (

                    memberId?.toString() ===
                    user?._id?.toString()

                );

            }

        );

    const isOwner =
        currentMember?.role === "Owner";

    // ============================================
    // Save Household Settings
    // ============================================

    const handleSaveFamily =
        async event => {

            event.preventDefault();

            if (!family?._id) {

                return;

            }

            setSavingFamily(true);

            setFamilySuccess("");

            setFamilyError("");

            try {

                const response =
                    await API.put(

                        `/family/${family._id}`,

                        {

                            name:
                                familyName.trim(),

                            description:
                                familyDescription.trim(),

                        }

                    );

                const updatedFamily =
                    response.data?.data ||
                    response.data;

                if (updatedFamily) {

                    setFamilyName(
                        updatedFamily.name ||
                        ""
                    );

                    setFamilyDescription(
                        updatedFamily.description ||
                        ""
                    );

                }

                setFamilySuccess(

                    "Household settings updated successfully."

                );

            }

            catch (error) {

                setFamilyError(

                    error.response?.data?.message ||

                    error.message ||

                    "Failed to update household settings."

                );

            }

            finally {

                setSavingFamily(false);

            }

        };

    return (

        <DashboardLayout>

            <div className="max-w-4xl mx-auto space-y-8">

                {/* ============================================
                    Header
                ============================================ */}

                <div>

                    <h1

                        className="text-3xl font-bold"

                        style={{

                            color:
                                "var(--text-primary)",

                        }}

                    >

                        Settings

                    </h1>

                    <p

                        className="mt-2"

                        style={{

                            color:
                                "var(--text-secondary)",

                        }}

                    >

                        Personalize Aphelion and manage your household settings.

                    </p>

                </div>

                {/* ============================================
                    Theme Settings
                ============================================ */}

                <div>

                    <div className="mb-5">

                        <h2

                            className="text-2xl font-semibold"

                            style={{

                                color:
                                    "var(--text-primary)",

                            }}

                        >

                            Appearance

                        </h2>

                        <p

                            className="mt-1"

                            style={{

                                color:
                                    "var(--text-secondary)",

                            }}

                        >

                            Personalize the appearance of Aphelion.

                        </p>

                    </div>

                    {/* Theme Card */}

                    <div className="glass rounded-3xl p-8">

                        <div className="space-y-5">

                            {/* Dark */}

                            <label

                                className="flex items-center justify-between cursor-pointer"

                            >

                                <span

                                    style={{

                                        color:
                                            "var(--text-primary)",

                                    }}

                                >

                                    🌙 Dark Mode

                                </span>

                                <input

                                    type="radio"

                                    value="dark"

                                    checked={
                                        mode === "dark"
                                    }

                                    onChange={() =>

                                        dispatch(

                                            setThemeMode(
                                                "dark"
                                            )

                                        )

                                    }

                                />

                            </label>

                            {/* Light */}

                            <label

                                className="flex items-center justify-between cursor-pointer"

                            >

                                <span

                                    style={{

                                        color:
                                            "var(--text-primary)",

                                    }}

                                >

                                    ☀️ Light Mode

                                </span>

                                <input

                                    type="radio"

                                    value="light"

                                    checked={
                                        mode === "light"
                                    }

                                    onChange={() =>

                                        dispatch(

                                            setThemeMode(
                                                "light"
                                            )

                                        )

                                    }

                                />

                            </label>

                            {/* System */}

                            <label

                                className="flex items-center justify-between cursor-pointer"

                            >

                                <span

                                    style={{

                                        color:
                                            "var(--text-primary)",

                                    }}

                                >

                                    💻 System Theme

                                </span>

                                <input

                                    type="radio"

                                    value="system"

                                    checked={
                                        mode === "system"
                                    }

                                    onChange={() =>

                                        dispatch(

                                            setThemeMode(
                                                "system"
                                            )

                                        )

                                    }

                                />

                            </label>

                        </div>

                    </div>

                </div>

                {/* ============================================
                    Theme Preview
                ============================================ */}

                <div>

                    <div className="glass rounded-3xl p-8">

                        <h2

                            className="text-xl font-semibold mb-5"

                            style={{

                                color:
                                    "var(--text-primary)",

                            }}

                        >

                            Theme Preview

                        </h2>

                        <div className="grid md:grid-cols-3 gap-5">

                            {/* Card Preview */}

                            <div

                                className="glass rounded-2xl p-5 hover-lift"

                            >

                                <h3

                                    style={{

                                        color:
                                            "var(--text-primary)",

                                    }}

                                >

                                    Card Preview

                                </h3>

                                <p

                                    className="mt-2"

                                    style={{

                                        color:
                                            "var(--text-secondary)",

                                    }}

                                >

                                    Glass card using your design system.

                                </p>

                            </div>

                            {/* Button Preview */}

                            <div

                                className="glass rounded-2xl p-5 hover-lift"

                            >

                                <button

                                    className="px-5 py-2 rounded-xl"

                                    style={{

                                        background:
                                            "var(--primary)",

                                        color:
                                            "#fff",

                                    }}

                                >

                                    Primary Button

                                </button>

                            </div>

                            {/* Avatar Preview */}

                            <div

                                className="glass rounded-2xl p-5 hover-lift"

                            >

                                <div

                                    className="h-10 w-10 rounded-full flex items-center justify-center"

                                    style={{

                                        background:
                                            "var(--primary)",

                                        color:
                                            "#fff",

                                    }}

                                >

                                    A

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ============================================
                    Household Settings
                ============================================ */}

                {family && (

                    <div>

                        <div className="mb-5">

                            <h2

                                className="text-2xl font-semibold"

                                style={{

                                    color:
                                        "var(--text-primary)",

                                }}

                            >

                                Household

                            </h2>

                            <p

                                className="mt-1"

                                style={{

                                    color:
                                        "var(--text-secondary)",

                                }}

                            >

                                Manage information for your household.

                            </p>

                        </div>

                        <div className="glass rounded-3xl p-8">

                            <form

                                onSubmit={
                                    handleSaveFamily
                                }

                                className="space-y-6"

                            >

                                {/* Household Name */}

                                <div>

                                    <label

                                        className="block text-sm font-medium mb-2"

                                        style={{

                                            color:
                                                "var(--text-primary)",

                                        }}

                                    >

                                        Household Name

                                    </label>

                                    <input

                                        type="text"

                                        value={
                                            familyName
                                        }

                                        onChange={event =>

                                            setFamilyName(
                                                event.target.value
                                            )

                                        }

                                        maxLength={100}

                                        disabled={
                                            !isOwner ||
                                            savingFamily
                                        }

                                        required

                                        className="w-full rounded-xl px-4 py-3 border bg-transparent outline-none disabled:opacity-60"

                                        style={{

                                            borderColor:
                                                "var(--glass-border)",

                                            color:
                                                "var(--text-primary)",

                                        }}

                                    />

                                </div>

                                {/* Description */}

                                <div>

                                    <label

                                        className="block text-sm font-medium mb-2"

                                        style={{

                                            color:
                                                "var(--text-primary)",

                                        }}

                                    >

                                        Description

                                    </label>

                                    <textarea

                                        value={
                                            familyDescription
                                        }

                                        onChange={event =>

                                            setFamilyDescription(
                                                event.target.value
                                            )

                                        }

                                        maxLength={300}

                                        rows={4}

                                        disabled={
                                            !isOwner ||
                                            savingFamily
                                        }

                                        className="w-full rounded-xl px-4 py-3 border bg-transparent outline-none resize-none disabled:opacity-60"

                                        style={{

                                            borderColor:
                                                "var(--glass-border)",

                                            color:
                                                "var(--text-primary)",

                                        }}

                                    />

                                </div>

                                {/* Owner Information */}

                                <div

                                    className="rounded-xl p-4"

                                    style={{

                                        background:
                                            "var(--bg-secondary)",

                                    }}

                                >

                                    <p

                                        className="text-sm"

                                        style={{

                                            color:
                                                "var(--text-secondary)",

                                        }}

                                    >

                                        Household Owner

                                    </p>

                                    <p

                                        className="font-medium mt-1"

                                        style={{

                                            color:
                                                "var(--text-primary)",

                                        }}

                                    >

                                        {family.owner?.name ||
                                            "Unknown"}

                                    </p>

                                </div>

                                {/* Permission Message */}

                                {!isOwner && (

                                    <div

                                        className="rounded-xl p-4"

                                        style={{

                                            background:
                                                "var(--bg-secondary)",

                                            color:
                                                "var(--text-secondary)",

                                        }}

                                    >

                                        Only the household owner can modify household information.

                                    </div>

                                )}

                                {/* Error */}

                                {familyError && (

                                    <div className="bg-red-50 text-red-600 rounded-xl p-4">

                                        {familyError}

                                    </div>

                                )}

                                {/* Success */}

                                {familySuccess && (

                                    <div className="bg-green-50 text-green-600 rounded-xl p-4">

                                        {familySuccess}

                                    </div>

                                )}

                                {/* Save */}

                                {isOwner && (

                                    <button

                                        type="submit"

                                        disabled={
                                            savingFamily
                                        }

                                        className="px-6 py-3 rounded-xl text-white disabled:opacity-50"

                                        style={{

                                            background:
                                                "var(--primary)",

                                        }}

                                    >

                                        {savingFamily

                                            ? "Saving..."

                                            : "Save Household Changes"

                                        }

                                    </button>

                                )}

                            </form>

                        </div>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );

};

export default Settings;