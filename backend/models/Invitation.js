import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(

    {

        family: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Family",

            required: true,

        },

        sender: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        receiverEmail: {

            type: String,

            required: true,

            lowercase: true,

            trim: true,

        },

        role: {

            type: String,

            enum: [

                "Admin",

                "Member",

                "Viewer",

            ],

            default: "Member",

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "Accepted",

                "Rejected",

                "Expired",

            ],

            default: "Pending",

        },

        expiresAt: {

            type: Date,

            default: () => {

                const date = new Date();

                date.setDate(

                    date.getDate() + 7

                );

                return date;

            },

        },

    },

    {

        timestamps: true,

    }

);

const Invitation = mongoose.model(

    "Invitation",

    invitationSchema

);

export default Invitation;