import React, { createRef } from "react";
import lazyLoad from "../components/LazyLoad";

export default {
  element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
  path: "/home",
  nodeRef: createRef(),
  meta: {
    order: 1,
    title: "首页",
    permission: "",
  },
};
