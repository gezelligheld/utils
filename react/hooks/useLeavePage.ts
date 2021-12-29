import { useRef, useEffect } from 'react';

export default function useLeavePage<T = any>(data: T, callback: (data: T) => void) {
    const dataRef = useRef<T | null>(null);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(
        () => () => {
            dataRef.current && callback(dataRef.current);
        },
        [],
    );
}
