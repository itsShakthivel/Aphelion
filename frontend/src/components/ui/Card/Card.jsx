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
    clickable = false,
    ...props
}) => {
    const variants = CARD_ANIMATIONS?.[animation];

    return (
        <motion.div
            variants={variants}
            initial={variants ? "hidden" : false}
            animate={variants ? "visible" : false}
            whileHover={
                hover
                    ? {
                          y: -4,
                          scale: 1.01,
                          transition: {
                              duration: 0.25,
                              ease: "easeOut",
                          },
                      }
                    : undefined
            }
            className={cn(
                "card-base",
                "relative overflow-hidden",
                "transition-all duration-300",
                "border border-[var(--glass-border)]",
                "bg-[var(--surface)]",
                "backdrop-blur-xl",

                paddingVariants?.[padding],
                roundedVariants?.[rounded],
                shadowVariants?.[shadow],
                accentVariants?.[accent],

                glass && "glass",
                hover && "hover-lift",

                clickable && "cursor-pointer",

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