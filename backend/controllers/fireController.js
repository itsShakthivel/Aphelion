import { getFIREData } from "../services/fireService.js";

export const getFIREPlanner = async (

    req,

    res

) => {

    try {

        const result = await getFIREData(

            req.user.id,

            req.query

        );

        res.status(200).json({

            success: true,

            data: result,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};