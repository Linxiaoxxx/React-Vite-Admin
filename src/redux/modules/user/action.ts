import { UserState } from "@/redux/interface";

export const userUpdate = (payload: Partial<UserState>) => ({
  type: "USER_UPDATE",
  payload,
});

export const userLogout = (payload: boolean) => ({
  type: "USER_LOGOUT",
  payload,
});

export const setFirstAuthRouter = (payload: Router.RouteObject | null) => ({
  type: "SET_FIRST_AUTH_ROUTER",
  payload,
});
