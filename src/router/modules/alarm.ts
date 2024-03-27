import React, { createRef } from "react";
import lazyLoad from "../components/LazyLoad";

export default {
  path: "/alarm",
  meta: {
    order: 2,
    permission: "per2",
    title: "威胁告警",
  },
  nodeRef: createRef(),
  children: [
    {
      element: lazyLoad(React.lazy(() => import("@/views/alarm/assets/index"))),
      path: "/alarm/assets",
      meta: { title: "资产威胁", permission: "per3" },
    },
    {
      element: lazyLoad(
        React.lazy(() => import("@/views/alarm/assets/detail"))
      ),
      path: "/alarm/assets/detail",
      meta: {
        title: "资产威胁详情",
        permission: "",
        hideInMenu: true,
      },
    },
    {
      element: lazyLoad(React.lazy(() => import("@/views/alarm/attack/index"))),
      path: "/alarm/attack",
      meta: {
        title: "攻击威胁",
        permission: "per4",
      },
    },
  ],
};
