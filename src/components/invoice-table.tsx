import {
  useReactTable,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import type { DetailInvoice } from "../types/fetch";
import { PaymentStatus } from "../types/fetch";
import type { FC } from "react";
import type { InvoiceTableProps } from "../types/props";
import { Pagination } from "./pagination";
import { PAYMENT_STATUSES } from "../utils/constants";
import { PaymentStatusChip } from "./payment-status-chip";
import { Link } from "react-router";
import { TrashIcon } from "./svgs/trash-icon";

export const InvoiceTable: FC<InvoiceTableProps> = ({
  invoices,
  page,
  limit,
  totalPages,
  totalItems,
  paginating,
  onInvoiceDelete,
}) => {
  const columns: ColumnDef<DetailInvoice>[] = [
    {
      header: "",
      accessorKey: "removeInvoice",
      cell: (cell) => {
        return cell.row.original.paymentStatus ===
          PaymentStatus.PAYMENT_LINK_NOT_GENERATED ? (
          <button
            onClick={() => {
              onInvoiceDelete(cell.row.original.id);
            }}
            className="p-1.5 rounded hover:bg-red-100 text-red-600 transition-colors duration-200"
          >
            <TrashIcon />
          </button>
        ) : null;
      },
    },
    {
      header: "Invoice Number",
      accessorKey: "invoiceNumber",
    },
    {
      header: "Customer Name",
      accessorKey: "customerName",
    },
    {
      header: "Customer Email",
      accessorKey: "customerEmail",
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: (cell) => {
        const amount = Number(cell.row.original.amount);
        return (
          <div className="text-right">
            {amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        );
      },
    },
    {
      header: "Invoice Date",
      accessorKey: "invoiceDate",
      cell: (cell) => {
        const invDate = new Date(cell.row.original.invoiceDate);
        return <div>{invDate.toLocaleDateString()}</div>;
      },
    },
    {
      header: "Due Date",
      accessorKey: "dueDate",
      cell: (cell) => {
        const dueDate = new Date(cell.row.original.dueDate);
        return <div>{dueDate.toLocaleDateString()}</div>;
      },
    },
    {
      header: "Status",
      accessorKey: "paymentStatus",
      cell: (cell) => {
        const [paymentStatus] = PAYMENT_STATUSES.filter(
          (status) => status.value === cell.row.original.paymentStatus
        );

        return <PaymentStatusChip status={paymentStatus.value} />;
      },
    },
    {
      header: "",
      accessorKey: "paymentStatusChip",
      cell: (cell) => {
        return cell.row.original.paymentStatus ===
          PaymentStatus.PAYMENT_LINK_NOT_GENERATED ? (
          <Link
            to={`/invoice/generate-payment-link?id=${cell.row.original.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-2.5 py-1 rounded border border-indigo-700 hover:border-indigo-800 shadow-sm transition-colors duration-200"
          >
            Generate Payment Link
          </Link>
        ) : null;
      },
    },
  ];

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto space-y-4 bg-white p-4 rounded-md shadow">
      <table className="min-w-full border border-gray-200 rounded-md text-sm">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-indigo-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        limit={limit}
        onPageChange={(page) => {
          paginating(page, limit);
        }}
      />
    </div>
  );
};
