import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { COOKIE_AUTH_TOKEN } from "../utils/constants";

export const MasterPage: React.FC = () => {
  const cookie = new Cookies();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/login");
    }

    if (cookie.get(COOKIE_AUTH_TOKEN) && !pathname.includes("/payment")) {
      navigate("/flash-sale");
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="fixed flex items-center px-6 py-4">
        <img src="/vite.svg" alt="App Logo" className="h-10 w-auto" />
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
