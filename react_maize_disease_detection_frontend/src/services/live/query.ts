import httpUtils from "../../utils/httpBase.utils";

export const GET_ALL_LIVE = () => {
  return httpUtils.get("/live");
};
export const GET_LIVE_COMMNET = (id: any) => {
  console.log("i am here", id);
  return httpUtils.get(`/comment/${id.queryKey[1]}`);
};

export const GET_ONE_LIVE = (id: any) => {
  return httpUtils.get(`/live/${id.queryKey[1]}`);
};
