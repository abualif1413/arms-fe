import * as yup from "yup";
import { DataOwner, PaymentStatus } from "../types/fetch";

export const financeManagerRegistrationSchema = yup
  .object({
    email: yup
      .string()
      .email("The value you are giving is not a valid email format")
      .required("Email is required"),
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirmation password is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    securityQuestion: yup.string(),
    securityAnswer: yup.string(),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("The value you are giving is not a valid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const invoiceSchema = yup
  .object({
    invoiceNumber: yup
      .string()
      .max(10, "Maximum invoice number is 10 characters")
      .required("Invoice number is required"),
    customerName: yup.string().required("Customer name is required"),
    customerEmail: yup
      .string()
      .email("The value you entered is not a valid email format")
      .required("Customer email is required"),
    customerPhone: yup.string().required("Customer phone is required"),
    invoiceDate: yup
      .date()
      .typeError("Invoice date is required")
      .required("Invoice date is required"),
    dueDate: yup
      .date()
      .typeError("Due date is required")
      .required("Due date is required")
      .min(yup.ref("invoiceDate"), "Due date must be after the invoice date"),
    amount: yup
      .number()
      .typeError("Amount must be a valid number")
      .positive("Amount must be greater than zero")
      .required("Amount is required"),
  })
  .required();

export const filterInvoiceSchema = yup
  .object({
    invoiceNumber: yup.string().trim(),
    customer: yup.string().trim(),
    invoiceDateStart: yup.string().trim(),
    invoiceDateEnd: yup.string().trim(),
    dueDateStart: yup.string().trim(),
    dueDateEnd: yup.string().trim(),
    paymentStatus: yup
      .mixed<PaymentStatus>()
      .oneOf(Object.values(PaymentStatus)),
    dataOwner: yup.mixed<DataOwner>().oneOf(Object.values(DataOwner)),
  })
  .required();
