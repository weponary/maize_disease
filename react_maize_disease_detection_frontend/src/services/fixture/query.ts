import httpUtils from "../../utils/httpBase.utils";

export const GET_ALL_FIXTURE = () => {
  return httpUtils.get("fixture");
};
