export const formatNumber = (
    value,
    {
        currency = "INR",
        locale = "en-IN",
        compact = false,
        decimals = 0,
    } = {}
) => {

    const number = Number(value) || 0;

    return new Intl.NumberFormat(locale, {

        style: "currency",

        currency,

        notation: compact ? "compact" : "standard",

        minimumFractionDigits: decimals,

        maximumFractionDigits: decimals,

    }).format(number);

};