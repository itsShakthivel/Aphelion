import { useSelector } from "react-redux";

import NotificationCard from "./NotificationCard";

const NotificationCenter = () => {

    const {

        notifications,

        summary,

    } = useSelector(

        state => state.notifications

    );

    return (

        <div className="space-y-6">

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

                    <p>Total</p>

                    <h2 className="text-3xl font-bold">

                        {summary.total}

                    </h2>

                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

                    <p>Unread</p>

                    <h2 className="text-3xl font-bold">

                        {summary.unread}

                    </h2>

                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

                    <p>Critical</p>

                    <h2 className="text-3xl font-bold">

                        {summary.critical}

                    </h2>

                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

                    <p>High</p>

                    <h2 className="text-3xl font-bold">

                        {summary.high}

                    </h2>

                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">

                    <p>Info</p>

                    <h2 className="text-3xl font-bold">

                        {summary.info}

                    </h2>

                </div>

            </div>

            <div className="space-y-4">

                {

                    notifications.map(notification => (

                        <NotificationCard

                            key={notification._id}

                            notification={notification}

                        />

                    ))

                }

            </div>

        </div>

    );

};

export default NotificationCenter;