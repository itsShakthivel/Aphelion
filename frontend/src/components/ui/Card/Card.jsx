import { motion } from "framer-motion";

import {
    cn,
    CARD_ACCENTS,
    CARD_PADDING,
    CARD_RADIUS,
    CARD_SHADOWS,
} from "../../../utils";

import { CARD_ANIMATIONS } from "../../../animations/motionVariants";

const Card = ({
    children,

    className = "",

    accent = "none",

    shadow = "floating",

    padding = "md",

    rounded = "lg",

    animation = "fadeUp",

    glass = true,

    hover = true,

    shine = true,

    ...props
}) => {

    const variants = CARD_ANIMATIONS[animation];

    return (

        <motion.div

            variants={variants}

            initial={variants ? "hidden" : false}

            animate={variants ? "visible" : false}

            className={cn(

                "card-base",

                CARD_PADDING[padding],

                CARD_RADIUS[rounded],

                CARD_SHADOWS[shadow],

                glass && "glass",

                hover && "hover-lift",

                shine && "card-shine",

                CARD_ACCENTS[accent],

                className

            )}

            {...props}

        >

            {children}

        </motion.div>

    );

};

export default Card;