export const formatCurrency = (value = 0) => {

    return new Intl.NumberFormat(

        "en-IN",

        {

            style: "currency",

            currency: "INR",

            notation: "compact",

            maximumFractionDigits: 1,

        }

    ).format(value);

};