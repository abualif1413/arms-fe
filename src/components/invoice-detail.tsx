import React from "react";
import { PaymentStatusChip } from "./payment-status-chip";
import type { PaymentStatus } from "../types/fetch";

interface InvoiceDetailsProps {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  invoiceDate: Date;
  dueDate: Date;
  amount: number;
  paymentStatus: PaymentStatus;
}

export const InvoiceDetailsCard: React.FC<InvoiceDetailsProps> = ({
  invoiceNumber,
  customerName,
  customerEmail,
  customerPhone,
  invoiceDate,
  dueDate,
  amount,
  paymentStatus,
}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="text-lg font-semibold text-gray-800">Invoice Details</h2>
        <PaymentStatusChip status={paymentStatus} />
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Invoice #:</span>
          <span>{invoiceNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Customer:</span>
          <span>{customerName}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{customerEmail}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Phone:</span>
          <span>{customerPhone}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Invoice Date:</span>
          <span>{invoiceDate.toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Due Date:</span>
          <span>{dueDate.toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between pt-2 border-t border-gray-100">
          <span className="font-medium text-gray-600">Amount:</span>
          <span className="text-lg font-semibold text-gray-900">
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
