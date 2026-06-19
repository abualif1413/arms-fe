import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { invoiceSchema } from "../utils/validation-schema";
import * as yup from "yup";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { createInvoice } from "../utils/fetch";
import { ToastContainer, toast } from "react-toastify";
import type { AxiosError } from "axios";
import { SpinnerContext } from "./page-spinner";

export const InvoiceInput: FC = () => {
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);

  const { mutate: invoiceCreation, isPending } = useMutation({
    mutationFn: createInvoice,
    onSuccess: (data) => {
      toast(
        `Invoice #${data.data.invoiceNumber} was created successfully! Please visit invoice listing page to generate payment link`,
        {
          type: "success",
        }
      );
      reset({
        invoiceNumber: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        invoiceDate: new Date(),
        dueDate: new Date(),
        amount: 0,
      });
    },
    onError: (error) => {
      console.error("Login failed: ", error);
      toast(
        `Invoice creation failed ${
          (error as AxiosError<{ message: string; statusCode: number }>)
            .response?.data.message
        }`,
        {
          type: "error",
        }
      );
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
  });

  const onSubmit = (data: yup.InferType<typeof invoiceSchema>) => {
    invoiceCreation(data);
  };

  useEffect(() => {
    if (isPending) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, [isPending, showSpinner, hideSpinner]);

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gray-50">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Create New Invoice
        </h2>

        {/* Invoice Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Invoice Number</label>
          <input
            type="text"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
              errors.invoiceNumber
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter invoice number"
            {...register("invoiceNumber")}
          />
          {errors.invoiceNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.invoiceNumber.message}
            </p>
          )}
        </div>

        {/* Customer Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Customer Name</label>
          <input
            type="text"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
              errors.customerName
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter customer name"
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customerName.message}
            </p>
          )}
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Customer Email</label>
          <input
            type="text"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
              errors.customerEmail
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter customer email"
            {...register("customerEmail")}
          />
          {errors.customerEmail && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customerEmail.message}
            </p>
          )}
        </div>

        {/* Customer Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Customer Phone</label>
          <input
            type="tel"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
              errors.customerPhone
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter customer phone"
            {...register("customerPhone")}
          />
          {errors.customerPhone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.customerPhone.message}
            </p>
          )}
        </div>

        {/* Invoice Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Invoice Date</label>
          <input
            type="date"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
              errors.invoiceDate
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            {...register("invoiceDate")}
          />
          {errors.invoiceDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.invoiceDate.message}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
              errors.dueDate
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            {...register("dueDate")}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
              errors.amount
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter total amount"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Create Invoice
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};
