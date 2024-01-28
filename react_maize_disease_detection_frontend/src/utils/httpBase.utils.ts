import { httpBase } from "./http.utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function get(endpoint: string, params?: any) {
  return httpBase().get(`${endpoint}`, { params });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function store(endpoint: string, data: any) {
  return httpBase().post(`${endpoint}`, data);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function update(endpoint: string, data: any) {
  return httpBase().patch(`${endpoint}`, data);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateWithFile(endpoint: string, data: any) {
  return httpBase(true).patch(`${endpoint}`, data);
}

function saveWithFile(endpoint: string, data: unknown) {
  return httpBase(true).post(`${endpoint}`, data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function remove(endpoint: string, params?: any) {
  return httpBase().delete(`${endpoint}`, { params });
}

function getFile(endpoint: string) {
  return httpBase(false, "blob").get(`${endpoint}`);
}

const httpUtils = {
  get,
  store,
  update,
  remove,
  updateWithFile,
  getFile,
  saveWithFile
};

export default httpUtils;
