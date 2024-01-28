import httpUtils from "../../utils/httpBase.utils";

export const GET_ALL_NEWS = () => {
  return httpUtils.get("news");
};
