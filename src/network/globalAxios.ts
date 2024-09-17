import axios from "axios";

const mainAxios = axios.create({
  timeout: 10000,
});

export const createAxios = (
  url: string,
  getToken: () => string,
  onUnauthorized: (error: any) => void
) => {
  mainAxios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
  mainAxios.defaults.baseURL = url;

  mainAxios.interceptors.request.use(
    (config) => {
      const newConfig = { ...config };
      const token = getToken();
      if (token) {
        const authString = "Bearer " + token;
        newConfig.headers.Authorization = authString;
      }
      console.debug(
        newConfig.method +
          " " +
          newConfig.url +
          " " +
          (newConfig.data ? JSON.stringify(newConfig.data, null, 2) : "{}")
      );
      config = newConfig;
      return newConfig;
    },
    (error) => {
      console.error("http request error:", JSON.stringify(error, null, 2));
    }
  );

  mainAxios.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const prettyError = {
        message: error.message || "An error occurred",
        request: {
          method: error.config.method,
          url: error.config.baseURL + error.config.url,
          data: {},
        },
        response: {},
      };
      if (error.config.data) {
        prettyError.request.data = error.config.data
          .toString()
          .replace(/"/g, "")
          .replace(/,/g, ", ")
          .replace(/:/g, ": ");
      }
      if (error.response) {
        prettyError.response = {
          status: error.response.status,
          data: error.response.data,
        };
        prettyError.message = error.response.data; // override message with server response if it exists
      }
      if (error.response?.status === 401) {
        onUnauthorized(error);
      }
      return { error: prettyError, failure: true };
    }
  );
  return mainAxios;
};

export interface AxiosError {
  message: string;
  request: {
    method: string;
    url: string;
    data: string;
  };
  response?: {
    status: number;
    data: string;
  };
}

export { mainAxios as axios };
