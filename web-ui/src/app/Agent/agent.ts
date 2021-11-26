import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(3000);
    return response;
  } catch (error) {
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.get(url, body).then(responseBody),
  del: (url: string, body: {}) => axios.get(url).then(responseBody),
};

const Acivities = {
  list: () => requests.get<Activity[]>("/Activities"),
};

const agent = {
  Acivities,
};

export default agent;
