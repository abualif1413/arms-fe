import axios, { type AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { BASE_API_URL, COOKIE_AUTH_TOKEN } from "./constants";
import type {
  DetailInvoice,
  FilterInvoice,
  FilterInvoiceResult,
  FinanceManagerRegistration,
  InvoiceData,
  LoginCredentials,
  LoginResponse,
  PaidInvoice,
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
  }
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
  }
);

export const registerUserPost = async (
  financeManagerRegistration: FinanceManagerRegistration
) => {
  const registeringUser = await fetchInstance.post<
    FinanceManagerRegistration,
    AxiosResponse<FinanceManagerRegistration, FinanceManagerRegistration>,
    FinanceManagerRegistration
  >("/finance-managers/register", financeManagerRegistration);

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

export const createInvoice = async (invoiceData: InvoiceData) => {
  const creatingInvoice = await fetchInstance.post<
    InvoiceData,
    AxiosResponse<InvoiceData, InvoiceData>,
    InvoiceData
  >("/invoices/create", invoiceData);

  return creatingInvoice;
};

export const removeInvoice = async (invoiceId: string) => {
  const creatingInvoice = await fetchInstance.delete<
    boolean,
    AxiosResponse<boolean, string>,
    string
  >(`/invoices/remove/${invoiceId}`);

  return creatingInvoice;
};

export const filterInvoices = async (filterInvoiceData: FilterInvoice) => {
  const utcInvDateStart = filterInvoiceData.invoiceDateStart
    ? new Date(`${filterInvoiceData.invoiceDateStart} 00:00:00`).toISOString()
    : "";
  const utcInvDateEnd = filterInvoiceData.invoiceDateEnd
    ? new Date(`${filterInvoiceData.invoiceDateEnd} 00:00:00`).toISOString()
    : "";
  const utcDueDateStart = filterInvoiceData.dueDateStart
    ? new Date(`${filterInvoiceData.dueDateStart} 00:00:00`).toISOString()
    : "";
  const utcDueDateEnd = filterInvoiceData.dueDateEnd
    ? new Date(`${filterInvoiceData.dueDateEnd} 00:00:00`).toISOString()
    : "";

  const newSearchParams = new URLSearchParams();
  newSearchParams.append(
    "invoiceNumber",
    filterInvoiceData.invoiceNumber ?? ""
  );
  newSearchParams.append("customer", filterInvoiceData.customer ?? "");
  newSearchParams.append("invoiceDateStart", utcInvDateStart);
  newSearchParams.append("invoiceDateEnd", utcInvDateEnd);
  newSearchParams.append("dueDateStart", utcDueDateStart);
  newSearchParams.append("dueDateEnd", utcDueDateEnd);
  newSearchParams.append(
    "paymentStatus",
    filterInvoiceData.paymentStatus ?? ""
  );
  newSearchParams.append("dataOwner", filterInvoiceData.dataOwner ?? "");
  newSearchParams.append("page", filterInvoiceData.page.toString() ?? "1");
  newSearchParams.append("limit", filterInvoiceData.limit.toString() ?? "5");
  const queryString = newSearchParams.toString();

  const filteredInvoices = await fetchInstance.get<
    FilterInvoiceResult,
    AxiosResponse<FilterInvoiceResult, FilterInvoice>,
    FilterInvoice
  >(`/invoices/filter?${queryString}`);

  return filteredInvoices;
};

export const getInvoicesBy = async (
  filterBy: "id" | "invoice_number" | "payment_token",
  filterValue: string
) => {
  const newSearchParams = new URLSearchParams();
  newSearchParams.append("filterBy", filterBy);
  newSearchParams.append("filterValue", filterValue);
  const queryString = newSearchParams.toString();

  const filteredInvoices = await fetchInstance.get<
    DetailInvoice,
    AxiosResponse<DetailInvoice, { filterBy: string; filterValue: string }>,
    { filterBy: string; filterValue: string }
  >(`/invoices/get-by?${queryString}`);

  return filteredInvoices;
};

export const generatePaymentLink = async (invoiceId: string) => {
  const generateLink = await fetchInstance.post<
    boolean,
    AxiosResponse<boolean, { invoiceId: string }>,
    { invoiceId: string }
  >("/invoices/generate-payment-link", { invoiceId });

  return generateLink;
};

export const verifyPaymentLink = async (paymentToken: string) => {
  const newSearchParams = new URLSearchParams();
  newSearchParams.append("paymentToken", paymentToken);
  const queryString = newSearchParams.toString();

  const invoice = await fetchInstance.get<
    InvoiceData,
    AxiosResponse<InvoiceData, { filterBy: string; filterValue: string }>,
    { filterBy: string; filterValue: string }
  >(`/invoices/verify-payment-link?${queryString}`);

  return invoice;
};

export const proceedPayment = async (paymentToken: string) => {
  const paidInvoice = await fetchInstance.post<
    PaidInvoice,
    AxiosResponse<PaidInvoice, { paymentToken: string }>,
    { paymentToken: string }
  >("/invoices/proceed-payment", { paymentToken });

  return paidInvoice;
};
