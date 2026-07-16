import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({
    value = 0,
    duration = 1500,
    prefix = "",
    suffix = "",
    decimals = 0,
}) => {

    const [displayValue, setDisplayValue] = useState(0);

    const frameRef = useRef();

    useEffect(() => {

        const startValue = displayValue;

        const endValue = Number(value) || 0;

        const startTime = performance.now();

        const animate = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Ease Out Cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            const currentValue =
                startValue +
                (endValue - startValue) * ease;

            setDisplayValue(currentValue);

            if (progress < 1) {

                frameRef.current =
                    requestAnimationFrame(animate);

            }

        };

        frameRef.current =
            requestAnimationFrame(animate);

        return () => {

            cancelAnimationFrame(frameRef.current);

        };

    }, [value]);

    return (

        <span>

            {prefix}

            {displayValue.toLocaleString("en-IN", {

                minimumFractionDigits: decimals,

                maximumFractionDigits: decimals,

            })}

            {suffix}

        </span>

    );

};

export default AnimatedNumber;