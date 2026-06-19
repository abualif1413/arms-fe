import type { DetailInvoice, FilterInvoice, PaymentStatus } from "./fetch";

export interface FilterInvoiceProps {
  initialValues: FilterInvoice;
  setFilterInvoiceData: (filterData: FilterInvoice) => void;
}

export interface InvoiceTableProps {
  invoices: DetailInvoice[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  paginating: (page: number, limit: number) => void;
  onInvoiceDelete: (invoiceId: string) => void;
}

export interface PageSpinnerProps {
  children: React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export interface PaymentStatusChipProps {
  status: PaymentStatus;
}

export interface TokenInputProps {
  length?: number;
  onComplete?: (token: string) => void;
  onIncomplete?: () => void;
}

export interface PageErrorMessageProps {
  message: string;
}

export interface SuccessInformationProps {
  invoiceNumber?: string;
  amount?: number;
}
