import { isArray, isObject } from "@/utils/is";
import { useEffect, useRef, useState } from "react";

type CallbackFun<T> = (data?: T | undefined) => void;
type SetDataFun<T> = (state: Partial<T> | T, callback?: CallbackFun<T>) => void;
type SetCallbackState<S> = [S, SetDataFun<S>];

function useCallbackState<T>(initialState: T): SetCallbackState<T> {
    const cbRef = useRef<(data?: T) => void>();
    const [data, setData] = useState<T>(initialState);

    useEffect(() => {
        cbRef.current && cbRef.current(data);
    }, [data]);

    const setDataCallback: SetDataFun<T> = (state, callback) => {
        cbRef.current = callback;

        if (isObject(state)) {
            setData((oldState) => ({ ...oldState, ...state }));
        } else {
            throw new Error("state 类型错误");
        }
    };

    return [data, setDataCallback];
}
export default useCallbackState;
