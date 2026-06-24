import { createBrowserRouter } from "react-router";
import { UserRegistrationForm } from "../components/user-registration";
import { MasterPage } from "../components/master-page";
import { Login } from "../components/login";
import { Dashboard } from "../components/dashboard";
import { FlashSale } from "../components/flash-sale";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MasterPage />,
    children: [
      {
        path: "/register",
        element: <UserRegistrationForm />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/flash-sale",
    element: <Dashboard />,
    children: [
      {
        path: "/flash-sale",
        element: (
          <FlashSale />
        ),
      },
    ],
  },
]);
