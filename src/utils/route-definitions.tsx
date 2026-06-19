import { createBrowserRouter } from "react-router";
import { FinanceManagerRegistrationForm } from "../components/finance-manager-registration";
import { MasterPage } from "../components/master-page";
import { Login } from "../components/login";
import { Dashboard } from "../components/dashboard";
import { InvoiceInput } from "../components/invoice-input";
import { ViewInvoices } from "../components/view-invoices";
import { GeneratePaymentLink } from "../components/generate-payment-link";
import { InvoicePayment } from "../components/invoice-payment";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MasterPage />,
    children: [
      {
        path: "/register",
        element: <FinanceManagerRegistrationForm />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/payment/:paymentToken",
        element: <InvoicePayment />,
      },
    ],
  },
  {
    path: "/invoice",
    element: <Dashboard />,
    children: [
      {
        path: "/invoice/dashboard/",
        element: (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to the Dashboard
            </h2>
            <p className="text-gray-600">
              Choose an option from the sidebar to get started.
            </p>
          </>
        ),
      },
      {
        path: "/invoice/create-invoice",
        element: <InvoiceInput />,
      },
      {
        path: "/invoice/view-invoices",
        element: <ViewInvoices />,
      },
      {
        path: "/invoice/generate-payment-link",
        element: <GeneratePaymentLink />,
      },
    ],
  },
]);
