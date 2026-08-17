import {
    useState,
    useEffect,
    useRef,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    FaBell,
} from "react-icons/fa6";

import NotificationDropdown
    from "../../components/notifications/NotificationDropdown";

import {
    fetchNotifications,
} from "../../features/notifications/notificationSlice";

const NotificationBell = () => {

    const dispatch =
        useDispatch();

    const [
        open,
        setOpen,
    ] = useState(false);

    const bellRef =
        useRef(null);

    const [
        position,
        setPosition,
    ] = useState({
        top: 80,
        right: 24,
    });

    const notificationsState =
        useSelector(
            (state) =>
                state.notifications || {}
        );

    const summary =
        notificationsState.summary || {
            unread: 0,
            total: 0,
            critical: 0,
            high: 0,
            info: 0,
        };

    useEffect(() => {

        dispatch(
            fetchNotifications()
        );

    }, [dispatch]);

    const updatePosition = () => {

        if (
            !bellRef.current
        ) {

            return;

        }

        const rect =
            bellRef.current.getBoundingClientRect();

        const gap =
            10;

        const viewportPadding =
            16;

        const dropdownWidth =
            Math.min(
                420,
                window.innerWidth -
                viewportPadding * 2
            );

        const right =
            Math.max(
                viewportPadding,
                window.innerWidth -
                rect.right
            );

        const adjustedRight =
            Math.min(
                right,
                window.innerWidth -
                dropdownWidth -
                viewportPadding
            );

        setPosition({

            top:
                rect.bottom +
                gap,

            right:
                adjustedRight,

        });

    };

    const handleToggle = () => {

        if (!open) {

            updatePosition();

        }

        setOpen(
            (previous) =>
                !previous
        );

    };

    useEffect(() => {

        if (!open) {

            return;

        }

        const handleResize = () => {

            updatePosition();

        };

        const handleScroll = () => {

            updatePosition();

        };

        window.addEventListener(
            "resize",
            handleResize
        );

        window.addEventListener(
            "scroll",
            handleScroll,
            true
        );

        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );

            window.removeEventListener(
                "scroll",
                handleScroll,
                true
            );

        };

    }, [open]);

    return (

        <div
            ref={bellRef}
            className="relative"
        >

            <button
                type="button"
                onClick={
                    handleToggle
                }
                aria-label="Notifications"
                aria-expanded={
                    open
                }
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >

                <FaBell
                    size={22}
                />

                {
                    Number(
                        summary.unread
                    ) > 0 && (

                        <span
                            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center"
                        >

                            {
                                summary.unread
                            }

                        </span>

                    )
                }

            </button>

            {
                open && (

                    <NotificationDropdown
                        close={() =>
                            setOpen(false)
                        }
                        position={
                            position
                        }
                    />

                )
            }

        </div>

    );

};

export default NotificationBell;