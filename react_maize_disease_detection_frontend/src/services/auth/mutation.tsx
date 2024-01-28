import httpUtils from "../../utils/httpBase.utils";

export const CREATE_USER = (data: any) => {
  return httpUtils.store("/user", data);
};

export const LOGIN = (data: any) => {
  return httpUtils.store("/auth/login", data);
};

export const FORGET_PASSWORD = (data: any) => {
  return httpUtils.update("/auth/forgetPassword", data);
};

export const RESET_PASSWORD = (data: any) => {
  return httpUtils.update(`/auth/resetPassword/${data.token}`, data);
};

export const CHANGE_PASSWORD = (data: any) => {
  return httpUtils.update("/user/changePassword", data);
};
