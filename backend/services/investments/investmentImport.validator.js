const ALLOWED_TYPES = [

    "stock",

    "mutual_fund",

    "index_fund",

    "etf",

    "gold",

    "crypto",

    "fd",

    "real_estate",

    "bond",

    "other",

];


const ALLOWED_SOURCES = [

    "angel_one",

];


// ======================================================
// VALIDATE NUMBER
// ======================================================

const validateNumber = (
    value,
    fieldName,
    {
        required = false,
        min = null,
    } = {}
) => {

    if (
        value === null ||
        value === undefined
    ) {

        if (required) {

            throw new Error(
                `${fieldName} is required.`
            );

        }

        return;

    }


    if (
        typeof value !== "number" ||
        !Number.isFinite(value)
    ) {

        throw new Error(
            `${fieldName} must be a valid number.`
        );

    }


    if (
        min !== null &&
        value < min
    ) {

        throw new Error(
            `${fieldName} cannot be less than ${min}.`
        );

    }

};


// ======================================================
// VALIDATE ONE HOLDING
// ======================================================

export const validateImportedHolding = (
    holding
) => {

    if (
        !holding ||
        typeof holding !== "object"
    ) {

        throw new Error(
            "Invalid investment holding."
        );

    }


    // ==============================================
    // Name
    // ==============================================

    if (
        typeof holding.name !== "string" ||
        !holding.name.trim()
    ) {

        throw new Error(
            "Investment name is required."
        );

    }


    if (
        holding.name.trim().length > 200
    ) {

        throw new Error(
            "Investment name is too long."
        );

    }


    // ==============================================
    // Type
    // ==============================================

    if (
        !ALLOWED_TYPES.includes(
            holding.type
        )
    ) {

        throw new Error(

            `Invalid investment type for ${holding.name}.`

        );

    }


    // ==============================================
    // Source
    // ==============================================

    if (
        !ALLOWED_SOURCES.includes(
            holding.source
        )
    ) {

        throw new Error(

            `Invalid investment source for ${holding.name}.`

        );

    }


    // ==============================================
    // Financial fields
    // ==============================================

    validateNumber(

        holding.units,

        "Units",

        {
            min: 0,
        }

    );


    validateNumber(

        holding.averagePrice,

        "Average price",

        {
            min: 0,
        }

    );


    validateNumber(

        holding.currentPrice,

        "Current price",

        {
            min: 0,
        }

    );


    validateNumber(

        holding.investedAmount,

        "Invested amount",

        {
            required: true,

            min: 0,

        }

    );


    validateNumber(

        holding.currentValue,

        "Current value",

        {
            required: true,

            min: 0,

        }

    );


    validateNumber(

        holding.profitLoss,

        "Profit/Loss"

    );


    validateNumber(

        holding.roi,

        "ROI"

    );


    validateNumber(

        holding.xirr,

        "XIRR"

    );


    // ==============================================
    // Date
    // ==============================================

    if (
        holding.valuationDate !== null &&
        holding.valuationDate !== undefined
    ) {

        const valuationDate =
            new Date(
                holding.valuationDate
            );


        if (
            Number.isNaN(
                valuationDate.getTime()
            )
        ) {

            throw new Error(

                `Invalid valuation date for ${holding.name}.`

            );

        }

    }


    return true;

};


// ======================================================
// VALIDATE ALL HOLDINGS
// ======================================================

export const validateImportedHoldings = (
    holdings
) => {

    if (
        !Array.isArray(
            holdings
        )
    ) {

        throw new Error(
            "Investment holdings must be an array."
        );

    }


    if (
        holdings.length === 0
    ) {

        throw new Error(
            "At least one investment holding is required."
        );

    }


    // Safety limit for first version.

    if (
        holdings.length > 500
    ) {

        throw new Error(
            "A maximum of 500 investments can be imported at once."
        );

    }


    holdings.forEach(
        validateImportedHolding
    );


    return true;

};

// ======================================================
// CHECK DUPLICATES INSIDE IMPORT
// ======================================================

export const validateNoDuplicateHoldings = (
    holdings
) => {

    const seen = new Set();


    for (
        const holding of holdings
    ) {

        const normalizedName =
            String(
                holding.name || ""
            )
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");


        const key =
            `${holding.source}:${normalizedName}`;


        if (
            seen.has(key)
        ) {

            throw new Error(

                `Duplicate investment found in import file: ${holding.name}`

            );

        }


        seen.add(key);

    }


    return true;

};