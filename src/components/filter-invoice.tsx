import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";

import type { FC } from "react";
import type { FilterInvoiceProps } from "../types/props";

import { DATA_OWNERS, PAYMENT_STATUSES } from "../utils/constants";
import { filterInvoiceSchema } from "../utils/validation-schema";

export const FilterInvoice: FC<FilterInvoiceProps> = ({
  initialValues,
  setFilterInvoiceData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(filterInvoiceSchema),
    defaultValues: {
      invoiceNumber: initialValues.invoiceNumber,
      customer: initialValues.customer,
      invoiceDateStart: initialValues.invoiceDateStart,
      invoiceDateEnd: initialValues.invoiceDateEnd,
      dueDateStart: initialValues.dueDateStart,
      dueDateEnd: initialValues.dueDateEnd,
      paymentStatus: initialValues.paymentStatus,
      dataOwner: initialValues.dataOwner,
    },
  });

  const onSubmit = (data: yup.InferType<typeof filterInvoiceSchema>) => {
    setFilterInvoiceData({ ...data, page: 1, limit: 5 });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded-md shadow"
    >
      {/* SEARCH SECTION */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Invoice Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Invoice Number
            </label>
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

          {/* Customer Name / Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name / Email
            </label>
            <input
              type="text"
              className={classNames(
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
                errors.customer
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-indigo-300"
              )}
              placeholder="Enter customer name or email"
              {...register("customer")}
            />
            {errors.customer && (
              <p className="mt-1 text-sm text-red-500">
                {errors.customer.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Invoice Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Invoice Date Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                className={classNames(
                  "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
                  errors.invoiceDateStart
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-indigo-300"
                )}
                {...register("invoiceDateStart")}
              />
              <span className="self-center text-gray-600">to</span>
              <input
                type="date"
                className={classNames(
                  "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
                  errors.invoiceDateEnd
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-indigo-300"
                )}
                {...register("invoiceDateEnd")}
              />
            </div>
          </div>

          {/* Due Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                className={classNames(
                  "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
                  errors.dueDateStart
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-indigo-300"
                )}
                {...register("dueDateStart")}
              />
              <span className="self-center text-gray-600">to</span>
              <input
                type="date"
                className={classNames(
                  "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring",
                  errors.dueDateEnd
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-indigo-300"
                )}
                {...register("dueDateEnd")}
              />
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            Payment Status
          </label>
          <div className="flex flex-wrap gap-4">
            {PAYMENT_STATUSES.map((status) => (
              <label
                key={status.value}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  className="text-indigo-600 focus:ring-indigo-300"
                  value={status.value}
                  {...register("paymentStatus")}
                />
                <span>{status.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Data Owner */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Data Owner</label>
          <div className="flex flex-wrap gap-4">
            {DATA_OWNERS.map((owner) => (
              <label
                key={owner.value}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  className="text-indigo-600 focus:ring-indigo-300"
                  value={owner.value}
                  {...register("dataOwner")}
                />
                <span>{owner.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Apply Search
        </button>
      </div>
    </form>
  );
};
