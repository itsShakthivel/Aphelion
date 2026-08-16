const normalizeInvestmentType = (
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


    if (
        normalizedSubCategory.includes(
            "index fund"
        )
    ) {

        return "index_fund";

    }


    if (
        normalizedSubCategory.includes(
            "flexi cap"
        )
    ) {

        return "mutual_fund";

    }


    if (
        normalizedCategory.includes(
            "equity"
        )
    ) {

        return "mutual_fund";

    }


    if (
        normalizedSubCategory.includes(
            "etf"
        )
    ) {

        return "etf";

    }


    if (
        normalizedSubCategory.includes(
            "gold"
        )
    ) {

        return "gold";

    }


    return "other";

};


// ======================================================
// NORMALIZE ONE HOLDING
// ======================================================

export const normalizeAngelOneHolding = (
    holding
) => {

    if (!holding?.name) {

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


    return {

        name: holding.name.trim(),

        type: normalizeInvestmentType(
            holding.subCategory,
            holding.category
        ),

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
            `Imported from Angel One. ISIN: ${holding.isin || "N/A"}`,

        // Broker metadata.
        // We will use this during duplicate
        // detection, but won't put it directly
        // into the current Investment model yet.

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
                holding.source || "Angel One",

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