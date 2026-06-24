import { useRef } from "react";
import { Link, Outlet, useLocation } from "react-router";
import classNames from "classnames";
import Cookies from "universal-cookie";

import { logout } from "../utils/auth";
import { COOKIE_USER_INFORMATION, SIDE_BARS } from "../utils/constants";
import { ExportIcon } from "./svgs/export-icon";

export const Dashboard: React.FC = () => {
  const cookie = new Cookies();
  const userInformation = useRef({ name: "", email: "" });

  const { pathname } = useLocation();

  if (cookie.get(COOKIE_USER_INFORMATION)) {
    userInformation.current = cookie.get("userInformation");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md flex flex-col sticky top-0 left-0 h-screen">
        {/* User Info */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between space-x-3">
          <img
            src={`https://ui-avatars.com/api/?name=${userInformation.current.name}&background=random`}
            className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold"
          />
          <div className="truncate">
            <p className="text-sm font-medium text-gray-800 truncate">
              {userInformation.current.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userInformation.current.email}
            </p>
          </div>

          {/* Logout Button */}
          <button
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
            title="Logout"
            onClick={() => {
              logout();
            }}
          >
            <ExportIcon />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {SIDE_BARS.map(({ label, target }) => {
              return (
                <li key={target}>
                  <Link
                    to={target}
                    className={classNames(
                      "block px-5 py-2 text-sm font-medium transition-colors duration-200",
                      {
                        "text-white bg-indigo-600 hover:bg-indigo-700":
                          pathname === target,
                        "text-gray-700 hover:bg-gray-100": pathname !== target,
                      }
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 text-xs text-gray-500">
          Bookipi Assessment - Flash Sale - Ilham Akbar
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
