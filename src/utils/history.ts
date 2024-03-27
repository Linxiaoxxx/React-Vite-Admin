import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const splitUrlParams = (params: string) => {
    return params.split("?")[1];
};

export default history;
