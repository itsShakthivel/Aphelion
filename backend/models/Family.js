import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        role: {

            type: String,

            enum: [

                "Owner",

                "Admin",

                "Member",

                "Viewer",

            ],

            default: "Member",

        },

        joinedAt: {

            type: Date,

            default: Date.now,

        },

    },

    {

        _id: false,

    }

);

const familySchema = new mongoose.Schema(

    {

        name: {

            type: String,

            required: true,

            trim: true,

            maxlength: 100,

        },

        owner: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        members: [

            familyMemberSchema,

        ],

        inviteCode: {

            type: String,

            required: true,

            unique: true,

        },

        description: {

            type: String,

            default: "",

            maxlength: 300,

        },

        isActive: {

            type: Boolean,

            default: true,

        },

    },

    {

        timestamps: true,

    }

);

const Family = mongoose.model(

    "Family",

    familySchema

);

export default Family;