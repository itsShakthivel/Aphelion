import { Parser } from "json2csv";

export const exportCSVReport = (data) => {

    const parser = new Parser();

    return parser.parse(data);

};