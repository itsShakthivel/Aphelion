import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import {

    fetchFamily,

    fetchInvitations,

} from "../../features/family/familySlice";

import FamilySummary from "../../components/family/FamilySummary";
import MembersTable from "../../components/family/MembersTable";
import InvitationList from "../../components/family/InvitationList";
import InviteMemberModal from "../../components/family/InviteMemberModal";

const Family = () => {

    const dispatch = useDispatch();

    const {

        family,

        invitations,

        loading,

        error,

    } = useSelector(

        state => state.family

    );

    useEffect(() => {

        dispatch(fetchFamily());

        dispatch(fetchInvitations());

    }, [dispatch]);

    if (loading)

        return (

            <DashboardLayout>

                <div className="p-10">

                    Loading Family...

                </div>

            </DashboardLayout>

        );

    if (error)

        return (

            <DashboardLayout>

                <div className="p-10 text-red-500">

                    {error}

                </div>

            </DashboardLayout>

        );

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <FamilySummary

                    family={family}

                />

                <InviteMemberModal

                    family={family}

                />

                <MembersTable

                    family={family}

                />

                <InvitationList

                    invitations={invitations}

                />

            </div>

        </DashboardLayout>

    );

};

export default Family;