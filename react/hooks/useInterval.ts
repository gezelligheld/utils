import { useEffect, useRef } from 'react';

export default function useInterval(
    callback: (() => void) | undefined,
    time: number,
    disabled?: boolean,
): void {
    const fn = useRef(callback);
    const tickRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fn.current = callback;
    }, [callback]);

    useEffect(() => {
        if (time < 0 || disabled) {
            tickRef.current && clearInterval(tickRef.current);
            return;
        }

        const trigger = () => fn.current && fn.current();
        const tick = setInterval(trigger, time);
        tickRef.current = tick;
        return () => clearInterval(tick);
    }, [time, disabled]);
}
