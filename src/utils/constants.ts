import { DataOwner, PaymentStatus } from "../types/fetch";

export const BASE_API_URL = import.meta.env.VITE_ARMS_BE_BASE_URL;
export const COOKIE_AUTH_TOKEN = "authToken";
export const COOKIE_USER_INFORMATION = "userInformation";

export const SIDE_BARS = [
  {
    label: "View Invoices",
    target: "/invoice/view-invoices",
  },
  {
    label: "Create Invoice",
    target: "/invoice/create-invoice",
  },
];

export const PAYMENT_STATUSES: { label: string; value: PaymentStatus }[] = [
  { label: "All status", value: PaymentStatus.ALL },
  {
    label: "Payment Link Not Generated",
    value: PaymentStatus.PAYMENT_LINK_NOT_GENERATED,
  },
  { label: "Outstanding", value: PaymentStatus.OUTSTANDING },
  { label: "Paid", value: PaymentStatus.PAID },
  { label: "Overdue", value: PaymentStatus.OVERDUE },
];

export const DATA_OWNERS: { label: string; value: DataOwner }[] = [
  { label: "All data", value: DataOwner.ALL },
  { label: "Owned by me", value: DataOwner.OWNED_BY_ME },
];
