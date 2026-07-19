import { motion } from "framer-motion";

import { cn } from "../../../utils";
import {
    accentVariants,
    paddingVariants,
    roundedVariants,
    shadowVariants,
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
    const variants = CARD_ANIMATIONS?.[animation];

    return (
        <motion.div
            variants={variants}
            initial={variants ? "hidden" : false}
            animate={variants ? "visible" : false}
            className={cn(
                "card-base",

                paddingVariants?.[padding],
                roundedVariants?.[rounded],
                shadowVariants?.[shadow],
                accentVariants?.[accent],

                glass && "glass",
                hover && "hover-lift",
                shine && "card-shine",

                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;