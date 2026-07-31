import { useEffect, useState } from "react";

import API from "../../api/axios";

const ReportsHistoryTable = () => {

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchReports();

    }, []);

    const fetchReports = async () => {

        try {

            const response = await API.get(

                "/reports/history"

            );

            setReports(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        try {

            await API.delete(

                `/reports/history/${id}`

            );

            fetchReports();

        }

        catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-white">

                Loading...

            </div>

        );

    }

    return (

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">

            <h2 className="text-xl font-semibold text-white mb-6">

                Report History

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="text-zinc-400">

                        <th className="text-left py-3">

                            Report

                        </th>

                        <th className="text-left">

                            Format

                        </th>

                        <th className="text-left">

                            Generated

                        </th>

                        <th className="text-right">

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        reports.map((report) => (

                            <tr

                                key={report._id}

                                className="border-t border-zinc-800"

                            >

                                <td className="py-4 text-white capitalize">

                                    {report.reportType}

                                </td>

                                <td className="text-zinc-300 uppercase">

                                    {report.format}

                                </td>

                                <td className="text-zinc-400">

                                    {

                                        new Date(

                                            report.generatedAt

                                        ).toLocaleString()

                                    }

                                </td>

                                <td className="text-right">

                                    <button

                                        onClick={() =>

                                            handleDelete(

                                                report._id

                                            )

                                        }

                                        className="text-red-500 hover:text-red-400"

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ReportsHistoryTable;