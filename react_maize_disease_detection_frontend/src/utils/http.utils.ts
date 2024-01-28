import axios from "axios";
import { getTokenFromStorage } from "./storage.utils";

export const httpBase = (isFile = false, responseType = "json") => {
  const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
    headers: {
      Accept: "application/json",
      "Content-Type": isFile ? "multipart/form-data" : "application/json",
    },
    responseType: responseType === "blob" ? "blob" : "json",
  });
  api.interceptors.request.use(
    (config) => {
      const tokenFromStorage = getTokenFromStorage();

      if (tokenFromStorage) {
        config.headers.Authorization = `Bearer ${tokenFromStorage}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const code = error?.code;
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      // if (data?.status === 500 && data?.error === "jwt expired") {
      //   clearLocalSession("@hunimed-be-token");
      //   clearLocalSession("@myapp-role");
      //   if (typeof window !== "undefined") window.location.href = "/login";
      //   return Promise.reject();
      // }
      // if (
      //   (data?.status === 403 && data?.error === "User disabled") ||
      //   (data?.status === 401 &&
      //     data?.error === "Unauthorized! Not a Super Admin or Admin")
      // ) {
      //   clearLocalSession("@hunimed-be-token");
      //   clearLocalSession("@myapp-role");
      //   if (typeof window !== "undefined")
      //     window.location.href = "/unauthorized";
      //   return Promise.reject();
      // }

      return {
        code,
        status,
        message,
      };
    }
  );

  return api;
};
