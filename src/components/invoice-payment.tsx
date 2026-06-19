import { useContext, useEffect, useMemo, useState, type FC } from "react";
import { TokenInput } from "./token-input";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { proceedPayment, verifyPaymentLink } from "../utils/fetch";
import { SpinnerContext } from "./page-spinner";
import { PageErrorMessage } from "./page-error-message";
import type { AxiosError } from "axios";
import classNames from "classnames";
import type { SuccessInformationProps } from "../types/props";
import { toast, ToastContainer } from "react-toastify";

const SuccessInformation: FC<SuccessInformationProps> = ({
  amount,
  invoiceNumber,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        {invoiceNumber && (
          <p className="text-gray-600 mb-1">
            Invoice <span className="font-medium">#{invoiceNumber}</span> has
            been paid.
          </p>
        )}
        {amount !== undefined && (
          <p className="text-gray-600 mb-4">
            Amount:{" "}
            <span className="font-medium">
              {amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </p>
        )}
        <p className="text-gray-500">
          Thank you for your payment. You will receive a confirmation email
          shortly.
        </p>
      </div>
    </div>
  );
};

export const InvoicePayment: FC = () => {
  const { paymentToken } = useParams();
  const [securityToken, setSecurityToken] = useState<string>("");
  const [isSuccessPayment, setIsSuccessPayment] = useState(false);

  // query the current payment token, if it's a valid token or not
  const {
    data: invoices,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["invoices", paymentToken],
    queryFn: async () => {
      const filterResult = await verifyPaymentLink(paymentToken ?? "");

      return filterResult;
    },
    refetchOnWindowFocus: false,
  });
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);

  // mutate the payment process
  const { mutate: paymentProcessing, isPending: isProceedPaymentPending } =
    useMutation({
      mutationFn: proceedPayment,
      onSuccess: () => {
        setIsSuccessPayment(true);
      },
      onError: (error) => {
        console.error("Payment process failed: ", error);
        toast(
          ` Processing payment failure: ${
            (error as AxiosError<{ message: string; statusCode: number }>)
              .response?.data.message
          }`,
          {
            type: "error",
          }
        );
      },
    });

  // Enable confirm CTA based on the matching of input token and received token
  const isEnableConfirmCta = useMemo(
    () =>
      securityToken.toLocaleLowerCase() ===
      invoices?.data.paymentToken?.toLocaleLowerCase(),
    [invoices?.data.paymentToken, securityToken]
  );

  useEffect(() => {
    if (isPending || isProceedPaymentPending) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, [isPending, isProceedPaymentPending, showSpinner, hideSpinner]);

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

  if (isSuccessPayment) {
    return (
      <SuccessInformation
        invoiceNumber={invoices?.data.invoiceNumber}
        amount={Number(invoices?.data.amount)}
      />
    );
  }

  return invoices ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment Notice
        </h2>
        <p className="text-gray-700 text-base">
          You are about to proceed with payment for invoice{" "}
          <strong className="text-lg">#{invoices.data.invoiceNumber}</strong>.
          Please click the button below to confirm your payment.
        </p>
        <p className="mt-5">
          Amount:{" "}
          <span className="font-medium">
            {Number(invoices.data.amount).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </p>
        <p className="text-gray-700 text-base mt-5">
          Please enter the 6-character verification code that was sent to your
          email along with this payment link.
        </p>
        <br />
        <TokenInput
          onComplete={(token) => {
            setSecurityToken(token);
          }}
          onIncomplete={() => {
            setSecurityToken("");
          }}
        />
        <br />
        <button
          disabled={!isEnableConfirmCta}
          type="button"
          className={classNames(
            "w-full font-semibold py-3 rounded-md shadow-md transition duration-300",
            {
              "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300":
                isEnableConfirmCta,
              "bg-gray-300 text-gray-500 cursor-not-allowed":
                !isEnableConfirmCta,
            }
          )}
          onClick={() => {
            if (
              paymentToken &&
              confirm("Are you sure want to proceed this payment?")
            ) {
              paymentProcessing(paymentToken);
            }
          }}
        >
          Confirm Your Payment
        </button>
      </div>
      <ToastContainer />
    </div>
  ) : null;
};
