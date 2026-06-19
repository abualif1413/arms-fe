import { useContext, useEffect, useState, type FC } from "react";
import { FilterInvoice } from "./filter-invoice";
import { InvoiceTable } from "./invoice-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { filterInvoices, removeInvoice } from "../utils/fetch";
import {
  DataOwner,
  PaymentStatus,
  type FilterInvoice as FilterInvoiceType,
} from "../types/fetch";
import { useSearchParams } from "react-router";
import { SpinnerContext } from "./page-spinner";
import { toast, ToastContainer } from "react-toastify";
import type { AxiosError } from "axios";

export const ViewInvoices: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterInvoiceData, setFilterInvoiceData] = useState<FilterInvoiceType>(
    {
      invoiceNumber: searchParams.get("invoiceNumber") ?? "",
      customer: searchParams.get("customer") ?? "",
      invoiceDateStart: searchParams.get("invoiceDateStart") ?? "",
      invoiceDateEnd: searchParams.get("invoiceDateEnd") ?? "",
      dueDateStart: searchParams.get("dueDateStart") ?? "",
      dueDateEnd: searchParams.get("dueDateEnd") ?? "",
      paymentStatus:
        (searchParams.get("paymentStatus") as PaymentStatus) ??
        PaymentStatus.ALL,
      dataOwner: (searchParams.get("dataOwner") as DataOwner) ?? DataOwner.ALL,

      // Pagination filter
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 5,
    }
  );

  const {
    data: invoices,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["invoices", filterInvoiceData],
    queryFn: async () => {
      const filterResult = await filterInvoices(filterInvoiceData);

      return filterResult;
    },
    refetchOnWindowFocus: false,
  });
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);

  const { mutate: deleteInvoice, isPending: isRemoveInvoicePending } =
    useMutation({
      mutationFn: removeInvoice,
      onSuccess: () => {
        refetch();
        toast(`Invoice has been removed successfully`, { type: "success" });
      },
      onError: (error) => {
        console.error("Remove invoice failed: ", error);
        toast(
          ` Remove invoice failed: ${
            (error as AxiosError<{ message: string; statusCode: number }>)
              .response?.data.message
          }`,
          {
            type: "error",
          }
        );
      },
    });

  useEffect(() => {
    if (isPending || isRemoveInvoicePending) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, [isPending, isRemoveInvoicePending, showSpinner, hideSpinner]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.append(
      "invoiceNumber",
      filterInvoiceData.invoiceNumber ?? ""
    );
    newSearchParams.append("customer", filterInvoiceData.customer ?? "");
    newSearchParams.append(
      "invoiceDateStart",
      filterInvoiceData.invoiceDateStart ?? ""
    );
    newSearchParams.append(
      "invoiceDateEnd",
      filterInvoiceData.invoiceDateEnd ?? ""
    );
    newSearchParams.append(
      "dueDateStart",
      filterInvoiceData.dueDateStart ?? ""
    );
    newSearchParams.append("dueDateEnd", filterInvoiceData.dueDateEnd ?? "");
    newSearchParams.append(
      "paymentStatus",
      filterInvoiceData.paymentStatus ?? ""
    );
    newSearchParams.append("dataOwner", filterInvoiceData.dataOwner ?? "");
    newSearchParams.append("page", filterInvoiceData.page.toString() ?? "1");
    newSearchParams.append("limit", filterInvoiceData.limit.toString() ?? "5");
    setSearchParams(newSearchParams);
  }, [filterInvoiceData, setSearchParams]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        View Invoices
      </h2>
      <p className="text-gray-600">
        View all invoices and generate payment link for customers.
      </p>
      <br />
      <FilterInvoice
        initialValues={filterInvoiceData}
        setFilterInvoiceData={(filterData) => {
          setFilterInvoiceData(filterData);
        }}
      />
      <br />
      <InvoiceTable
        page={filterInvoiceData.page}
        limit={filterInvoiceData.limit}
        totalPages={invoices?.data.totalPages ?? 1}
        totalItems={invoices?.data.totalItems ?? 0}
        invoices={invoices?.data.invoices ?? []}
        paginating={(page, limit) => {
          setFilterInvoiceData((prev) => ({ ...prev, page, limit }));
        }}
        onInvoiceDelete={(invoiceId) => {
          if (confirm("Are you sure want to delete this invoice?")) {
            console.log("delete", invoiceId);
            deleteInvoice(invoiceId);
          }
        }}
      />
      <ToastContainer />
    </div>
  );
};
