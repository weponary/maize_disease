import httpUtils from "../../utils/httpBase.utils";

export const GET_HISTORY = ({ page, limit }: any) => {
  const params = new URLSearchParams();
  params.set("limit", limit ?? 10);
  if (page) params.set("page", page);
  const result = httpUtils.get(`/detect?${params}`);
  return result;
};
