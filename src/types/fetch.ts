export interface PaginatedFilter {
  page: number;
  limit: number;
}

export interface PaginatedResult {
  totalItems: number;
  totalPages: number;
}

export interface FinanceManagerRegistration {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  authenticationToken: string;
}

export interface InvoiceData {
  id?: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  invoiceDate: Date;
  dueDate: Date;
  amount: number;
  paymentToken?: string;
}

export enum PaymentStatus {
  ALL = "all",
  PAYMENT_LINK_NOT_GENERATED = "payment_link_not_generated",
  OUTSTANDING = "outstanding",
  PAID = "paid",
  OVERDUE = "overdue",
}

export enum DataOwner {
  ALL = "all",
  OWNED_BY_ME = "owned_by_me",
}

export interface FilterInvoice extends PaginatedFilter {
  invoiceNumber?: string;
  customer?: string;
  invoiceDateStart?: string;
  invoiceDateEnd?: string;
  dueDateStart?: string;
  dueDateEnd?: string;
  paymentStatus?: PaymentStatus;
  dataOwner?: DataOwner;
}

export interface DetailInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  invoiceDate: Date;
  dueDate: Date;
  amount: number;
  paymentStatus: PaymentStatus;
}

export interface FilterInvoiceResult extends PaginatedResult {
  invoices: DetailInvoice[];
}

export interface PaidInvoice {
  id: string;
  invoiceId: string;
  createdAt: Date;
  updatedAt: Date;
}
