import {
    getMemberRole,
    isOwner,
    isAdmin,
} from "../services/family/permission.service.js";

// ============================================
// Owner Only
// ============================================

export const requireOwner = async (
    req,
    res,
    next
) => {

    try {

        const familyId =
            req.params.familyId ||
            req.params.id ||
            req.body.family;

        const role = await getMemberRole(
            familyId,
            req.user.id
        );

        if (!isOwner(role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the household owner can perform this action.",

            });

        }

        next();

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ============================================
// Admin
// ============================================

export const requireAdmin = async (
    req,
    res,
    next
) => {

    try {

        const familyId =
            req.params.familyId ||
            req.params.id ||
            req.body.family;

        const role = await getMemberRole(
            familyId,
            req.user.id
        );

        if (!isAdmin(role)) {

            return res.status(403).json({

                success: false,

                message:
                    "Permission denied.",

            });

        }

        next();

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};