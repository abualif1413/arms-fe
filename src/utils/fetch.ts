import axios, { type AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { BASE_API_URL, COOKIE_AUTH_TOKEN } from "./constants";
import type {
  UserRegistration,
  LoginCredentials,
  LoginResponse,
  FlashSaleResponse,
  Purchase,
} from "../types/fetch";

const fetchInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 36000,
});

fetchInstance.interceptors.request.use(
  (request) => {
    const cookie = new Cookies();
    const token = cookie.get(COOKIE_AUTH_TOKEN);
    // Include the authentication token in the Authorization header if it exists
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

fetchInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const registerUserPost = async (userRegistration: UserRegistration) => {
  const registeringUser = await fetchInstance.post<
    UserRegistration,
    AxiosResponse<UserRegistration, UserRegistration>,
    UserRegistration
  >("/user/register", userRegistration);

  return registeringUser;
};

export const loginUserPost = async (loginCredentials: LoginCredentials) => {
  const loggingInUser = await fetchInstance.post<
    LoginResponse,
    AxiosResponse<LoginResponse, LoginCredentials>,
    LoginCredentials
  >("/auth/login-attempt", loginCredentials);

  return loggingInUser;
};

export const getTodayFlashSale = async () => {
  const filteredInvoices = await fetchInstance.get<
    FlashSaleResponse,
    AxiosResponse<FlashSaleResponse>
  >(`/flash-sale`);

  return filteredInvoices;
};

export const getRecentFlashSale = async () => {
  const filteredInvoices = await fetchInstance.get<
    FlashSaleResponse,
    AxiosResponse<FlashSaleResponse>
  >(`/flash-sale/recent`);

  return filteredInvoices;
};

export const getUpcomingFlashSale = async () => {
  const filteredInvoices = await fetchInstance.get<
    FlashSaleResponse,
    AxiosResponse<FlashSaleResponse>
  >(`/flash-sale/upcoming`);

  return filteredInvoices;
};

export const purchase = async (flashSaleId: string) => {
  const creatingInvoice = await fetchInstance.post<
    Purchase,
    AxiosResponse<Purchase, { flashSaleId: string }>,
    { flashSaleId: string }
  >("/flash-sale/purchase", { flashSaleId });

  return creatingInvoice;
};
