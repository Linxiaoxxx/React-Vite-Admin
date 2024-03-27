import { useState } from "react";

const useLoading = (init = false) => {
    const [loading, setLoading] = useState(init);

    const setLoadingState = (state: boolean) => {
        setLoading(state);
    };

    return { loading, setLoadingState };
};

export default useLoading;
