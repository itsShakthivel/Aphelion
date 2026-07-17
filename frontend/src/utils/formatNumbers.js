export const formatIndianNumber = (
    value,
    {
        compact = false,
        decimals = 0,
    } = {}
) => {

    const number = Number(value) || 0;

    if (!compact) {

        return number.toLocaleString("en-IN", {

            minimumFractionDigits: decimals,

            maximumFractionDigits: decimals,

        });

    }

    const abs = Math.abs(number);

    if (abs >= 10000000) {

        return `${(number / 10000000).toFixed(1)}Cr`;

    }

    if (abs >= 100000) {

        return `${(number / 100000).toFixed(1)}L`;

    }

    if (abs >= 1000) {

        return `${(number / 1000).toFixed(1)}K`;

    }

    return number.toLocaleString("en-IN", {

        minimumFractionDigits: decimals,

        maximumFractionDigits: decimals,

    });

};