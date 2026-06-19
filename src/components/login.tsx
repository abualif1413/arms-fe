import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../utils/validation-schema";
import * as yup from "yup";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { loginUserPost } from "../utils/fetch";
import { ToastContainer, toast } from "react-toastify";
import type { AxiosError } from "axios";
import { Link } from "react-router";
import { SpinnerContext } from "./page-spinner";
import { login } from "../utils/auth";

export const Login: FC = () => {
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);

  const { mutate: loginAttempt, isPending } = useMutation({
    mutationFn: loginUserPost,
    onSuccess: (data) => {
      // Set authentication token and user information in cookie
      login(data.data.authenticationToken, data.data.name, data.data.email);

      toast(`User logged in successfully!`, { type: "success" });
    },
    onError: (error) => {
      console.error("Login failed: ", error);
      toast(
        ` Authentication failure, access denied: ${
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: yup.InferType<typeof loginSchema>) => {
    loginAttempt(data);
  };

  useEffect(() => {
    if (isPending) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, [isPending, showSpinner, hideSpinner]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300",
              errors.email
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300",
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>

        <p className="mt-3 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-200"
          >
            Register
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};
