import React, { createRef } from "react";
import lazyLoad from "../components/LazyLoad";

export default {
  element: lazyLoad(React.lazy(() => import("@/views/about/index"))),
  nodeRef: createRef(),
  path: "/about",
  meta: {
    order: 2,
    title: "关于我们",
    permission: "per1",
  },
};
