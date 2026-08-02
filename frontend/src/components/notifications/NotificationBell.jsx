import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FaBell } from "react-icons/fa6";

import NotificationDropdown from "./NotificationDropdown";

import {

    fetchNotifications,

} from "../../features/notifications/notificationSlice";

const NotificationBell = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const { summary } = useSelector(

        (state) => state.notifications

    );

    useEffect(() => {

        dispatch(fetchNotifications());

    }, [dispatch]);

    return (

        <div className="relative">

            <button

                onClick={() => setOpen(!open)}

                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"

            >

                <FaBell size={22} />

                {

                    summary.unread > 0 && (

                        <span

                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center"

                        >

                            {summary.unread}

                        </span>

                    )

                }

            </button>

            {

                open && (

                    <NotificationDropdown

                        close={() => setOpen(false)}

                    />

                )

            }

        </div>

    );

};

export default NotificationBell;