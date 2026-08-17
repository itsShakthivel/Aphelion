import {
    useSelector,
    useDispatch,
} from "react-redux";

import NotificationCard
    from "./NotificationCard";

import {
    fetchNotifications,
    markAllNotificationsRead,
} from "../../features/notifications/notificationSlice";

const NotificationDropdown = ({
    close,
    position = {
        top: 80,
        right: 24,
    },
}) => {

    const dispatch =
        useDispatch();

    const notificationsState =
        useSelector(
            (state) =>
                state.notifications || {}
        );

    const notifications =
        Array.isArray(
            notificationsState.notifications
        )
            ? notificationsState.notifications
            : [];

    return (

        <div
            className="fixed bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[9999]"
            style={{
                top:
                    `${position.top}px`,

                right:
                    `${position.right}px`,

                width:
                    "min(420px, calc(100vw - 32px))",

                maxHeight:
                    "calc(100vh - 90px)",
            }}
        >

            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">

                <h2 className="font-bold text-lg">

                    Notifications

                </h2>

                <button
                    type="button"
                    onClick={
                        close
                    }
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl leading-none"
                    aria-label="Close notifications"
                >

                    ×

                </button>

            </div>

            <div className="max-h-[500px] overflow-y-auto p-4 space-y-4">

                {
                    notifications.length ===
                    0 ? (

                        <div className="text-center py-10 text-gray-500">

                            No notifications

                        </div>

                    ) : (

                        notifications
                            .slice(
                                0,
                                5
                            )
                            .map(
                                (
                                    notification
                                ) => (

                                    <NotificationCard
                                        key={
                                            notification._id
                                        }
                                        notification={
                                            notification
                                        }
                                    />

                                )
                            )

                    )
                }

            </div>

            {
                notifications.length >
                0 && (

                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">

                        <button
                            type="button"
                            onClick={
                                async () => {

                                    await dispatch(
                                        markAllNotificationsRead()
                                    );

                                    dispatch(
                                        fetchNotifications()
                                    );

                                }
                            }
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