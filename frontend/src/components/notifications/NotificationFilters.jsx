const NotificationFilters = () => {

    return (

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

            <div className="flex flex-wrap gap-3">

                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">

                    All

                </button>

                <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">

                    Unread

                </button>

                <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">

                    Critical

                </button>

                <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">

                    High

                </button>

                <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">

                    Read

                </button>

            </div>

        </div>

    );

};

export default NotificationFilters;