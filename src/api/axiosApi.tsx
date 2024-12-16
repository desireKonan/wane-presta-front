import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { baseURL, key } from "../utils/config";
import { DangerRight } from "./toastServices";
import { createSelector } from "reselect";


interface ApiResponseError {
  message: string | string[];
  code?: string;
}

// const getTokenData = (): string | null => localStorage.getItem("token");
const getTokenData = (): string | null => {
  if (typeof sessionStorage !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null;
};

export const apiInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    key,
    "Content-Type": "application/json",
  },
});

const cancelTokenSource = axios.CancelToken.source();
const token: string | null = getTokenData();
apiInstance.defaults.headers.common["Authorization"] = token ? `${token}` : "";
apiInstance.defaults.headers.common["key"] = key;

apiInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    config.cancelToken = cancelTokenSource.token;
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response: AxiosResponse): any => response.data,
  (error: AxiosError): Promise<void> => {
    const errorData = error.response?.data as ApiResponseError | undefined;

    if (!errorData) {
      DangerRight("An unexpected error occurred.");
      return Promise.reject(error);
    }

    if (!errorData.message) {
      DangerRight("Something went wrong!");
    }

    if (
      errorData.code === "E_USER_NOT_FOUND" ||
      errorData.code === "E_UNAUTHORIZED"
    ) {
      localStorage.clear();
      window.location.reload();
    }

    if (typeof errorData.message === "string") {
      DangerRight(errorData.message);
    } else if (Array.isArray(errorData.message)) {
      errorData.message.forEach((msg: string) => DangerRight(msg));
    }
    return Promise.reject(error);
  }
);

const handleErrors = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const data = await response.json();
    if (Array.isArray(data.message)) {
      data.message.forEach((msg: string) => DangerRight(msg));
    } else {
      DangerRight(data.message || "Unexpected error occurred.");
    }

    if (data.code === "E_USER_NOT_FOUND" || data.code === "E_UNAUTHORIZED") {
      // Handling authentication errors more gracefully
    }

    return Promise.reject(data);
  }

  return response.json();
};

const getHeaders = (): { [key: string]: string } => ({
  key,
  Authorization: getTokenData() ? `${getTokenData()}` : "",
  "Content-Type": "application/json",
});

export const apiInstanceFetch = {
  baseURL,
  get: (url: string) =>
    fetch(`${baseURL}${url}`, { method: "GET", headers: getHeaders() }).then(
      handleErrors
    ),

  post: (url: string, data: object) =>
    fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors),

  patch: (url: string, data: object) =>
    fetch(`${baseURL}${url}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors),

  put: (url: string, data: object) =>
    fetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors),

  delete: (url: string) =>
    fetch(`${baseURL}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleErrors),
};
