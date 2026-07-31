import { useState } from "react";

import { downloadCSVReport } from "../../api/reportAPI";

const ExportCSVCard = () => {

    const [type, setType] = useState("overview");

    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {

        try {

            setLoading(true);

            const response = await downloadCSVReport({

                type,

            });

            const url = window.URL.createObjectURL(

                new Blob([response.data])

            );

            const link = document.createElement("a");

            link.href = url;

            link.download = `${type}.csv`;

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

                Export CSV

            </h2>

            <p className="text-zinc-400 mt-2">

                Export financial data in CSV format.

            </p>

            <select

                value={type}

                onChange={(e) =>

                    setType(e.target.value)

                }

                className="mt-6 w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"

            >

                <option value="overview">

                    Overview

                </option>

                <option value="expenses">

                    Expenses

                </option>

                <option value="income">

                    Income

                </option>

                <option value="cashflow">

                    Cash Flow

                </option>

                <option value="networth">

                    Net Worth

                </option>

                <option value="fire">

                    FIRE

                </option>

            </select>

            <button

                onClick={handleDownload}

                disabled={loading}

                className="w-full mt-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-white font-semibold"

            >

                {

                    loading

                        ? "Exporting..."

                        : "Download CSV"

                }

            </button>

        </div>

    );

};

export default ExportCSVCard;