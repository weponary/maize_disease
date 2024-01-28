import httpUtils from "../../utils/httpBase.utils";

export const GET_ALL_HIGHLIGHT = () => {
  return httpUtils.get("/highlight");
};
