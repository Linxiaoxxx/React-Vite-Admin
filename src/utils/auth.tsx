import { store } from "@/redux";
import { isArray } from "./is";
import { ForwardRefExoticComponent } from "react";

export const setLogin = () => {
  localStorage.setItem("isLogin", "true");
};

export const checkLogin = () => {
  return localStorage.getItem("isLogin");
};

export const removeLogin = () => {
  localStorage.removeItem("isLogin");
};

export const checkAuth = (auth: string) => {
  const { func_perm: permissionList = [] } = store.getState().user.userInfo;
  const auths = isArray(auth) ? auth : [auth];
  const hasPermission = auths.some(
    (item) => permissionList.includes(item) || auth === "*"
  );
  return hasPermission;
};

type ActionType = "disabled";

export const WrapAuth = (
  CheckCom: ForwardRefExoticComponent<any>,
  type?: ActionType
) => {
  const WrapComponent = (props: any) => {
    if (checkAuth(props.auth)) {
      return <CheckCom {...props} />;
    } else {
      switch (type) {
        case "disabled":
          return <CheckCom {...props} disabled />;
        default:
          return null;
      }
    }
  };

  return WrapComponent;
};
