import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {

    fetchNotifications,

    deleteNotification,

    markNotificationRead,

} from "../../features/notifications/notificationSlice";

const colors = {

    Critical: "border-red-500",

    High: "border-orange-500",

    Medium: "border-yellow-500",

    Low: "border-blue-500",

    Info: "border-green-500",

};

const NotificationCard = ({

    notification,

}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (

        <div

            className={`border-l-4 rounded-xl shadow bg-white dark:bg-gray-900 p-5 ${colors[notification.priority]}`}

        >

            <div className="flex justify-between">

                <div>

                    <h3

                        onClick={() => {

                            if (notification.link) {

                                navigate(notification.link);

                            }

                        }}

                        className="font-semibold cursor-pointer hover:text-blue-600"

                    >

                        {notification.title}

                    </h3>

                    <p className="text-gray-600 mt-2">

                        {notification.message}

                    </p>

                </div>

                {

                    !notification.read && (

                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">

                            New

                        </span>

                    )

                }

            </div>

            <div className="flex justify-between items-center mt-5">

                <span className="text-sm">

                    {notification.priority}

                </span>

                <div className="flex gap-4">

                    {

                        !notification.read && (

                            <button

                                onClick={async () => {

                                    await dispatch(
                                        markNotificationRead(
                                            notification._id
                                        )
                                    );

                                    dispatch(fetchNotifications());

                                }}

                                className="text-blue-600 hover:text-blue-800"

                            >

                                Mark Read

                            </button>

                        )

                    }

                    <button

                        onClick={async () => {

                            await dispatch(
                                deleteNotification(
                                    notification._id
                                )
                            );

                            dispatch(fetchNotifications());

                        }}

                        className="text-red-600 hover:text-red-800"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default NotificationCard;