import { useState } from "react";

import { downloadPDFReport } from "../../api/reportAPI";

const GenerateReportCard = () => {

    const [reportType, setReportType] = useState("monthly");

    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {

        try {

            setLoading(true);

            const response = await downloadPDFReport({

                reportType,

            });

            const url = window.URL.createObjectURL(

                new Blob([response.data])

            );

            const link = document.createElement("a");

            link.href = url;

            link.download = `Aphelion_${reportType}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">

            <h2 className="text-xl font-semibold text-white">

                Generate PDF Report

            </h2>

            <p className="text-zinc-400 mt-2">

                Generate a professional financial report.

            </p>

            <select

                value={reportType}

                onChange={(e) =>

                    setReportType(e.target.value)

                }

                className="mt-6 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"

            >

                <option value="monthly">

                    Monthly Report

                </option>

                <option value="annual">

                    Annual Report

                </option>

                <option value="fire">

                    FIRE Report

                </option>

            </select>

            <button

                onClick={handleDownload}

                disabled={loading}

                className="w-full mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-white font-semibold"

            >

                {

                    loading

                        ? "Generating..."

                        : "Download PDF"

                }

            </button>

        </div>

    );

};

export default GenerateReportCard;