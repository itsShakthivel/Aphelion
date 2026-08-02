import { useSelector, useDispatch } from "react-redux";

import NotificationCard from "./NotificationCard";

import {

    fetchNotifications,

    markAllNotificationsRead,

} from "../../features/notifications/notificationSlice";

const NotificationDropdown = () => {

    const dispatch = useDispatch();

    const {

        notifications,

    } = useSelector(

        state => state.notifications

    );

    return (

        <div className="absolute right-0 mt-3 w-[420px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50">

            <div className="p-5 border-b">

                <h2 className="font-bold text-lg">

                    Notifications

                </h2>

            </div>

            <div className="max-h-[500px] overflow-y-auto p-4 space-y-4">

                {

                    notifications.length === 0 ? (

                        <div className="text-center py-10 text-gray-500">

                            No notifications

                        </div>

                    ) : (

                        notifications

                            .slice(0, 5)

                            .map((notification) => (

                                <NotificationCard

                                    key={notification._id}

                                    notification={notification}

                                />

                            ))

                    )

                }

            </div>

            {

                notifications.length > 0 && (

                    <div className="border-t p-4">

                        <button

                            onClick={async () => {

                                await dispatch(

                                    markAllNotificationsRead()

                                );

                                dispatch(

                                    fetchNotifications()

                                );

                            }}

                            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"

                        >

                            Mark All Read

                        </button>

                    </div>

                )

            }

        </div>

    );

};

export default NotificationDropdown;