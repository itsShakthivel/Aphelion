import * as XLSX from "xlsx";

export const exportCSV = (transactions) => {

    const data = transactions.map((transaction) => ({

        Date: new Date(
            transaction.date
        ).toLocaleDateString(),

        Type: transaction.type,

        Category:
            transaction.category?.name || "-",

        Description:
            transaction.description || "-",

        Amount:
            transaction.amount,

    }));

    const worksheet =
        XLSX.utils.json_to_sheet(data);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Transactions"
    );

    XLSX.writeFile(
        workbook,
        "Transactions.csv"
    );

};

export const exportExcel = (transactions) => {

    const data = transactions.map((transaction) => ({

        Date: new Date(
            transaction.date
        ).toLocaleDateString(),

        Type: transaction.type,

        Category:
            transaction.category?.name || "-",

        Description:
            transaction.description || "-",

        Amount:
            transaction.amount,

    }));

    const worksheet =
        XLSX.utils.json_to_sheet(data);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Transactions"
    );

    XLSX.writeFile(
        workbook,
        "Transactions.xlsx"
    );

};