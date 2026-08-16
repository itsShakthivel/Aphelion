// ======================================================
// NORMALIZE MUTUAL FUND CATEGORY
// ======================================================

const normalizeMutualFundCategory = (
    subCategory,
    category
) => {

    const normalizedSubCategory =
        String(
            subCategory || ""
        )
            .trim()
            .toLowerCase();


    const normalizedCategory =
        String(
            category || ""
        )
            .trim()
            .toLowerCase();


    // ==============================================
    // INDEX FUND
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "index fund"
        ) ||
        normalizedSubCategory.includes(
            "index"
        )
    ) {

        return "index_fund";

    }


    // ==============================================
    // FLEXICAP
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "flexi cap"
        ) ||
        normalizedSubCategory.includes(
            "flexicap"
        )
    ) {

        return "flexicap";

    }


    // ==============================================
    // LARGE CAP
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "large cap"
        ) ||
        normalizedSubCategory.includes(
            "largecap"
        )
    ) {

        return "large_cap";

    }


    // ==============================================
    // MID CAP
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "mid cap"
        ) ||
        normalizedSubCategory.includes(
            "midcap"
        )
    ) {

        return "mid_cap";

    }


    // ==============================================
    // SMALL CAP
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "small cap"
        ) ||
        normalizedSubCategory.includes(
            "smallcap"
        )
    ) {

        return "small_cap";

    }


    // ==============================================
    // MULTICAP
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "multi cap"
        ) ||
        normalizedSubCategory.includes(
            "multicap"
        )
    ) {

        return "multicap";

    }


    // ==============================================
    // ELSS
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "elss"
        )
    ) {

        return "elss";

    }


    // ==============================================
    // DEBT
    // ==============================================

    if (
        normalizedSubCategory.includes(
            "debt"
        ) ||
        normalizedSubCategory.includes(
            "liquid"
        ) ||
        normalizedSubCategory.includes(
            "money market"
        ) ||
        normalizedSubCategory.includes(
            "gilt"
        )
    ) {

        return "debt";

    }


    // ==============================================
    // CATEGORY FALLBACK
    // ==============================================

    if (
        normalizedCategory.includes(
            "debt"
        )
    ) {

        return "debt";

    }


    // ==============================================
    // DEFAULT
    // ==============================================

    return "other";

};


// ======================================================
// NORMALIZE ONE HOLDING
// ======================================================

export const normalizeAngelOneHolding = (
    holding
) => {

    if (
        !holding?.name
    ) {

        throw new Error(
            "Investment name is required."
        );

    }


    if (
        holding.investedAmount === null ||
        holding.investedAmount === undefined
    ) {

        throw new Error(
            `Invested amount missing for ${holding.name}.`
        );

    }


    if (
        holding.currentValue === null ||
        holding.currentValue === undefined
    ) {

        throw new Error(
            `Current value missing for ${holding.name}.`
        );

    }


    const normalizedSubCategory =
        String(
            holding.subCategory || ""
        )
            .trim()
            .toLowerCase();


    const normalizedCategory =
        String(
            holding.category || ""
        )
            .trim()
            .toLowerCase();


    // ==============================================
    // ETF
    // ==============================================

    const isETF =
        normalizedSubCategory.includes(
            "etf"
        ) ||
        normalizedCategory.includes(
            "etf"
        );


    // ==============================================
    // GOLD
    // ==============================================

    const isGold =
        normalizedSubCategory.includes(
            "gold"
        ) ||
        normalizedCategory.includes(
            "gold"
        );


    // ==============================================
    // TYPE
    // ==============================================

    let type = "other";

    let category = "other";


    if (isETF) {

        type = "etf";

        category = "other";

    }

    else if (isGold) {

        type = "gold";

        category = "other";

    }

    else if (
        normalizedCategory.includes(
            "equity"
        ) ||
        normalizedCategory.includes(
            "mutual fund"
        ) ||
        normalizedCategory.includes(
            "mutual_fund"
        )
    ) {

        type = "mutual_fund";

        category =
            normalizeMutualFundCategory(
                holding.subCategory,
                holding.category
            );

    }


    return {

        name:
            holding.name.trim(),

        type,

        category,

        units:
            holding.units,

        averagePrice:
            holding.averagePrice,

        currentPrice:
            holding.currentPrice,

        investedAmount:
            holding.investedAmount,

        currentValue:
            holding.currentValue,

        profitLoss:
            holding.profitLoss,

        roi:
            holding.roi,

        xirr:
            holding.xirr,

        purchaseDate:
            null,

        valuationDate:
            holding.valuationDate,

        source:
            "angel_one",

        notes:
            `Imported from Angel One. ISIN: ${
                holding.isin || "N/A"
            }`,

        // ==========================================
        // BROKER METADATA
        // ==========================================

        brokerData: {

            isin:
                holding.isin || null,

            category:
                holding.category || null,

            subCategory:
                holding.subCategory || null,

            folioNumber:
                holding.folioNumber || null,

            source:
                holding.source ||
                "Angel One",

        },

    };

};


// ======================================================
// NORMALIZE ALL HOLDINGS
// ======================================================

export const normalizeAngelOneHoldings = (
    holdings
) => {

    if (
        !Array.isArray(
            holdings
        )
    ) {

        throw new Error(
            "Invalid holdings data."
        );

    }


    return holdings.map(
        normalizeAngelOneHolding
    );

};