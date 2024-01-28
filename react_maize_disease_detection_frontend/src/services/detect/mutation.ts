import httpUtils from "../../utils/httpBase.utils";

export const UPLOAD_IMAGE = (data: any) => {
  return httpUtils.saveWithFile(`detect`, data);
};
