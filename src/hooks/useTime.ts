import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

export default function useTime() {
    let timer: any = null;
    const [time, setTime] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    const interval = () => {
        if (timer) {
            clearTimeout(timer);
        }
        setTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
        timer = setTimeout(() => {
            interval();
        });
    };
    useEffect(() => {
        interval();
        return () => {
            clearTimeout(timer);
        };
    }, [time]);

    return { time };
}
