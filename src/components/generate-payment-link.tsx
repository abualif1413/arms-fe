import { useContext, useEffect, type FC } from "react";
import { useSearchParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import type { AxiosError } from "axios";

import { InvoiceDetailsCard } from "./invoice-detail";
import { PageErrorMessage } from "./page-error-message";
import { SpinnerContext } from "./page-spinner";
import { generatePaymentLink, getInvoicesBy } from "../utils/fetch";

export const GeneratePaymentLink: FC = () => {
  const [searchParams] = useSearchParams();
  const {
    data: invoice,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["get_invoices", searchParams.get("id")],
    queryFn: async () => {
      const filterResult = await getInvoicesBy(
        "id",
        searchParams.get("id") ?? ""
      );

      return filterResult;
    },
    refetchOnWindowFocus: false,
  });
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);

  const { mutate: createPaymentLink, isPending: isCreatePaymentLinkPending } =
    useMutation({
      mutationFn: generatePaymentLink,
      onSuccess: () => {
        toast(
          `A unique payment link is created for the invoice #${invoice?.data.invoiceNumber}! A notification email has also been sent to the customer.`,
          { type: "success" }
        );
      },
      onError: (error) => {
        console.error("Failed to create a unique payment link", error);
        toast(
          `Failed to create a unique payment link: ${
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
    if (isPending || isCreatePaymentLinkPending) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, [isPending, isCreatePaymentLinkPending, showSpinner, hideSpinner]);

  if (isPending) {
    return null;
  }

  if (isError) {
    return (
      <PageErrorMessage
        message={
          (error as AxiosError<{ status: string; message: string }>).response
            ?.data.message ?? ""
        }
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Generate Payment Link
      </h2>
      <p className="text-gray-600">
        Generates a secure, one-time payment link to be sent to the customer via
        email.
      </p>

      <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center p-6 space-y-6">
        <InvoiceDetailsCard
          invoiceNumber={invoice.data.invoiceNumber}
          customerName={invoice.data.customerName}
          customerEmail={invoice.data.customerEmail}
          customerPhone={invoice.data.customerPhone}
          invoiceDate={new Date(invoice.data.invoiceDate)}
          dueDate={new Date(invoice.data.dueDate)}
          amount={Number(invoice.data.amount)}
          paymentStatus={invoice.data.paymentStatus}
        />

        {/* CTA Section */}
        <div className="w-[80%] flex flex-col items-center text-center space-y-4">
          <div className="w-full border border-yellow-300 bg-yellow-50 text-yellow-800 rounded-md px-4 py-4">
            <p className="text-sm font-semibold">
              <strong>Important:</strong> Once generated, the payment link
              cannot be undone. The secure link will be automatically sent to
              the customer's registered email address.
            </p>
          </div>

          <button
            onClick={() => {
              if (
                confirm(
                  "Are you sure want to create a payment link for this invoice?"
                )
              ) {
                createPaymentLink(invoice.data.id);
              }
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-md shadow-sm transition-colors duration-200"
          >
            Generate Payment Link
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
