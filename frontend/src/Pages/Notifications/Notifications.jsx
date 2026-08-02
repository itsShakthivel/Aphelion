import { useEffect } from "react";
import { useDispatch } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import NotificationCenter from "../../components/notifications/NotificationCenter";
import NotificationFilters from "../../components/notifications/NotificationFilters";

import {

    fetchNotifications,

} from "../../features/notifications/notificationSlice";

const Notifications = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchNotifications());

    }, [dispatch]);

    return (

        <DashboardLayout>

            <div className="space-y-6">

                <h1 className="text-3xl font-bold">

                    Notifications

                </h1>

                <NotificationFilters />

                <NotificationCenter />

            </div>

        </DashboardLayout>

    );

};

export default Notifications;