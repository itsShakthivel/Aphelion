// ==============================================
// MUTUAL FUND CATEGORY CONSISTENCY
// ==============================================

if (
    holding.type === "mutual_fund" &&
    !holding.category
) {

    throw new Error(

        `Mutual fund category is required for ${holding.name}.`

    );

}


if (
    holding.type !== "mutual_fund" &&
    holding.category !== "other"
) {

    throw new Error(

        `Category is only applicable to mutual funds for ${holding.name}.`

    );

}