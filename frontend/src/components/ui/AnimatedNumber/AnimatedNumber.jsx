import React, {
    memo,
    useEffect,
    useRef,
    useState,
} from "react";

import { useInView } from "react-intersection-observer";

import { formatNumber } from "../../../utils";

const easingFunctions = {
    smooth: (t) => 1 - Math.pow(1 - t, 3),
    linear: (t) => t,
    snappy: (t) => 1 - Math.pow(1 - t, 5),
};

const AnimatedNumber = ({
    value = 0,
    duration = 1500,
    currency = "INR",
    locale = "en-IN",
    suffix = "",
    decimals = 0,
    compact = false,
    easing = "smooth",
    animateOnView = true,
}) => {

    const [displayValue, setDisplayValue] = useState(0);

    const previousValue = useRef(0);

    const frameRef = useRef();

    const { ref, inView } = useInView({

        triggerOnce: true,

        threshold: 0.2,

    });

    useEffect(() => {

        if (animateOnView && !inView) return;

        const startValue = previousValue.current;

        const endValue = Number(value) || 0;

        const startTime = performance.now();

        const easingFunction =
            easingFunctions[easing] || easingFunctions.smooth;

        const animate = (time) => {

            const elapsed = time - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = easingFunction(progress);

            const current =
                startValue +
                (endValue - startValue) * easedProgress;

            setDisplayValue(current);

            if (progress < 1) {

                frameRef.current =
                    requestAnimationFrame(animate);

            } else {

                previousValue.current = endValue;

            }

        };

        frameRef.current =
            requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameRef.current);

    }, [
        value,
        duration,
        easing,
        animateOnView,
        inView,
    ]);

    return (

        <span ref={ref}>

            {formatNumber(displayValue, {

                currency,

                locale,

                compact,

                decimals,
            })}

            {suffix}

        </span>

    );

};

export default memo(AnimatedNumber);