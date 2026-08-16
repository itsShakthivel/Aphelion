import XLSX from "xlsx";


// ======================================================
// CONSTANTS
// ======================================================

const HOLDINGS_HEADER = "Fund Name";

const REQUIRED_HEADERS = [

    "Fund Name",

    "ISIN",

    "Category",

    "Sub Category",

    "Folio No",

    "Source",

    "Units",

    "Invested Value",

    "Average NAV",

    "Unrealized P&L",

    "Unrealized P&L %",

    "XIRR %",

];


// ======================================================
// HELPERS
// ======================================================

const cleanText = (value) => {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value).trim();

};


const cleanNumber = (value) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    if (typeof value === "number") {

        return Number.isFinite(value)
            ? value
            : null;

    }


    const cleaned =
        String(value)
            .replace(/₹/g, "")
            .replace(/,/g, "")
            .replace(/%/g, "")
            .trim();


    if (!cleaned) {

        return null;

    }


    const number =
        Number(cleaned);


    return Number.isFinite(number)
        ? number
        : null;

};


// ======================================================
// FIND HOLDINGS HEADER
// ======================================================

const findHoldingsHeaderRow = (
    worksheet
) => {

    const rows =
        XLSX.utils.sheet_to_json(
            worksheet,
            {
                header: 1,
                defval: null,
            }
        );


    const headerIndex =
        rows.findIndex(
            (row) =>
                row?.some(
                    (cell) =>
                        cleanText(cell) ===
                        HOLDINGS_HEADER
                )
        );


    if (headerIndex === -1) {

        throw new Error(
            "Angel One holdings table could not be found."
        );

    }


    return {

        rows,

        headerIndex,

    };

};


// ======================================================
// VALIDATE HEADERS
// ======================================================

const validateHeaders = (
    headerRow
) => {

    const headers =
        headerRow.map(
            (header) =>
                cleanText(header)
        );


    const missingHeaders =
        REQUIRED_HEADERS.filter(
            (requiredHeader) =>
                !headers.includes(
                    requiredHeader
                )
        );


    if (
        missingHeaders.length > 0
    ) {

        throw new Error(

            `Invalid Angel One Fund Holdings file. Missing columns: ${missingHeaders.join(", ")}`

        );

    }


    return headers;

};


// ======================================================
// FIND VALUATION DATE
// ======================================================

const extractValuationDate = (
    headers,
    rows
) => {

    const possibleTexts = [

        ...headers,

        ...rows
            .slice(0, 20)
            .flat()
            .map(cleanText),

    ];


    for (
        const text of possibleTexts
    ) {

        const match =
            text.match(
                /(\d{2})\/(\d{2})\/(\d{4})/
            );


        if (!match) {

            continue;

        }


        const [
            ,
            day,
            month,
            year,
        ] = match;


        const date =
            new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );


        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            return date;

        }

    }


    return null;

};


// ======================================================
// CREATE HEADER MAP
// ======================================================

const createHeaderMap = (
    headers
) => {

    const map = {};


    headers.forEach(
        (header, index) => {

            if (header) {

                map[header] =
                    index;

            }

        }
    );


    return map;

};


// ======================================================
// FIND HEADER BY PREFIX
// ======================================================

const findHeaderByPrefix = (
    headers,
    prefix
) => {

    return headers.find(
        (header) =>
            header
                .toLowerCase()
                .startsWith(
                    prefix.toLowerCase()
                )
    );

};


// ======================================================
// GET CELL
// ======================================================

const getCell = (
    row,
    headerMap,
    header
) => {

    const index =
        headerMap[header];


    if (
        index === undefined
    ) {

        return null;

    }


    return row[index];

};


// ======================================================
// IS VALID HOLDING ROW
// ======================================================

const isHoldingRow = (
    row,
    headerMap
) => {

    const fundName =
        cleanText(
            getCell(
                row,
                headerMap,
                "Fund Name"
            )
        );


    const units =
        cleanNumber(
            getCell(
                row,
                headerMap,
                "Units"
            )
        );


    const investedValue =
        cleanNumber(
            getCell(
                row,
                headerMap,
                "Invested Value"
            )
        );


    // Ignore blank rows.

    if (!fundName) {

        return false;

    }


    // Ignore total row.

    if (
        fundName.toLowerCase() ===
        "total"
    ) {

        return false;

    }


    // A valid holding must contain
    // either units or invested value.

    if (
        units === null &&
        investedValue === null
    ) {

        return false;

    }


    return true;

};


// ======================================================
// PARSE ANGEL ONE HOLDINGS
// ======================================================

export const parseAngelOneFundHoldings = (
    buffer
) => {

    // ==============================================
    // Validate uploaded file
    // ==============================================

    if (!buffer) {

        throw new Error(
            "No Excel file was provided."
        );

    }


    // ==============================================
    // Read workbook
    // ==============================================

    const workbook =
        XLSX.read(
            buffer,
            {
                type: "buffer",
                cellDates: true,
            }
        );


    if (
        !workbook.SheetNames.length
    ) {

        throw new Error(
            "The uploaded Excel workbook contains no worksheets."
        );

    }


    // ==============================================
    // Find Angel One holdings worksheet
    // ==============================================

    const sheetName =
        workbook.SheetNames.find(
            (name) =>
                name
                    .toLowerCase()
                    .includes(
                        "fund holdings"
                    )
        );


    const selectedSheetName =
        sheetName ||
        workbook.SheetNames[0];


    const worksheet =
        workbook.Sheets[
            selectedSheetName
        ];


    if (!worksheet) {

        throw new Error(
            "Unable to read the holdings worksheet."
        );

    }


    // ==============================================
    // Find header row
    // ==============================================

    const {
        rows,
        headerIndex,
    } =
        findHoldingsHeaderRow(
            worksheet
        );


    const headerRow =
        rows[headerIndex];


    // ==============================================
    // Validate headers
    // ==============================================

    const headers =
        validateHeaders(
            headerRow
        );


    // ==============================================
    // Create header map
    // ==============================================

    const headerMap =
        createHeaderMap(
            headers
        );


    // ==============================================
    // Find dynamic value/NAV columns
    // ==============================================

    const currentValueHeader =
        findHeaderByPrefix(
            headers,
            "Value as on"
        );


    const currentPriceHeader =
        findHeaderByPrefix(
            headers,
            "NAV as on"
        );


    if (!currentValueHeader) {

        throw new Error(
            "Could not find the Angel One current value column."
        );

    }


    if (!currentPriceHeader) {

        throw new Error(
            "Could not find the Angel One NAV column."
        );

    }


    // ==============================================
    // Extract valuation date
    // ==============================================

    const valuationDate =
        extractValuationDate(
            headers,
            rows
        );


    // ==============================================
    // Extract data rows
    // ==============================================

    const dataRows =
        rows.slice(
            headerIndex + 1
        );


    const holdings = [];


    // ==============================================
    // Process holdings
    // ==============================================

    for (
        const row of dataRows
    ) {

        if (
            !isHoldingRow(
                row,
                headerMap
            )
        ) {

            continue;

        }


        const holding = {

            name: cleanText(
                getCell(
                    row,
                    headerMap,
                    "Fund Name"
                )
            ),

            isin: cleanText(
                getCell(
                    row,
                    headerMap,
                    "ISIN"
                )
            ),

            category: cleanText(
                getCell(
                    row,
                    headerMap,
                    "Category"
                )
            ),

            subCategory: cleanText(
                getCell(
                    row,
                    headerMap,
                    "Sub Category"
                )
            ),

            folioNumber: cleanText(
                getCell(
                    row,
                    headerMap,
                    "Folio No"
                )
            ),

            source: cleanText(
                getCell(
                    row,
                    headerMap,
                    "Source"
                )
            ),

            units: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    "Units"
                )
            ),

            investedAmount: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    "Invested Value"
                )
            ),

            currentValue: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    currentValueHeader
                )
            ),

            averagePrice: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    "Average NAV"
                )
            ),

            currentPrice: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    currentPriceHeader
                )
            ),

            profitLoss: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    "Unrealized P&L"
                )
            ),

            roi: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    "Unrealized P&L %"
                )
            ),

            xirr: cleanNumber(
                getCell(
                    row,
                    headerMap,
                    "XIRR %"
                )
            ),

            valuationDate,

        };


        holdings.push(
            holding
        );

    }


    // ==============================================
    // Validate results
    // ==============================================

    if (
        holdings.length === 0
    ) {

        throw new Error(
            "No investment holdings were found in the Angel One file."
        );

    }


    // ==============================================
    // Return parsed result
    // ==============================================

    return {

        broker: "angel_one",

        worksheet:
            selectedSheetName,

        valuationDate,

        holdings,

    };

};


export default parseAngelOneFundHoldings;