export const getLocalSession = (key: string) => {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem(key);
    try {
      if (data) {
        return JSON.parse(data); // convets a JSON string into a Javascript Object
      }
    } catch (err) {
      return data;
    }
  }
};

export const setLocalSession = (key: string, value: string) => {
  if (value && typeof value === "string") {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, value);
    }
  }
};

export const getTokenFromStorage = () => {
  const accessToken = getLocalSession("@fun-token");
  if (accessToken) {
    return accessToken;
  }
  return null;
};

export const clearLocalSession = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
