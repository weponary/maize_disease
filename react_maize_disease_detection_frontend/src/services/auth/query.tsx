import httpUtils from "../../utils/httpBase.utils";

export const VERIFY_USER = (data: any) => {
  return httpUtils.get(`/auth/verifyEmail/${data}`);
};
