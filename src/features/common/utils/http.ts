import axios, { AxiosPromise } from "axios";

const env = process.env.NODE_ENV || "development";

const baseUrl =
  env === "production"
    ? "https://api.limestone.app.br"
    : "http://localhost:8080";

export function get<T = any>(
  route: string,
  options?: {
    params?: { [key: string]: any };
    customBaseUrl?: string;
    headers?: { [key: string]: any };
  }
): AxiosPromise<T> {
  return axios({
    method: "GET",
    url: (options?.customBaseUrl || baseUrl) + route,
    params: options?.params || {},
    headers: {
      Authorization: localStorage.getItem("access_token") || "",
      ...options?.headers,
    },
  }) as AxiosPromise<T>;
}

export function post<T = any>(
  route: string,
  data: { [key: string]: any },
  presetUrl?: string,
  options?: {
    params?: { [key: string]: any };
    customBaseUrl?: string;
    headers?: { [key: string]: any };
  }
): AxiosPromise<T> {
  return axios({
    method: "POST",
    url: (options?.customBaseUrl || baseUrl) + route,
    data,
    headers: {
      Authorization: localStorage.getItem("access_token") || "",
      ...options?.headers,
    },
    ...options,
  });
}

export function put<T>(
  route: string,
  data: { [key: string]: any },
  options?: {
    params?: { [key: string]: any };
    customBaseUrl?: string;
    headers?: { [key: string]: any };
  }
): AxiosPromise<T> {
  return axios({
    method: "PUT",
    url: (options?.customBaseUrl || baseUrl) + route,
    data,
    headers: {
      Authorization: localStorage.getItem("access_token") || "",
      ...options?.headers,
    },
    ...options,
  });
}

export function delette<T = any>(
  route: string,
  options?: {
    params?: { [key: string]: any };
    customBaseUrl?: string;
    headers?: { [key: string]: any };
  }
): AxiosPromise<T> {
  return axios({
    method: "delete",
    url: (options?.customBaseUrl || baseUrl) + route,
    params: options?.params || {},
    headers: {
      Authorization: localStorage.getItem("access_token") || "",
      ...options?.headers,
    },
  });
}
