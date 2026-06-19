import { useContext, useEffect, type FC } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import type { AxiosError } from "axios";

import { SpinnerContext } from "./page-spinner";
import { registerUserPost } from "../utils/fetch";
import { financeManagerRegistrationSchema } from "../utils/validation-schema";

export const FinanceManagerRegistrationForm: FC = () => {
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);

  const { mutate, isPending } = useMutation({
    mutationFn: registerUserPost,
    onSuccess: (data) => {
      toast(
        `Finance Manager (${data.data.name} - ${data.data.email}) registered successfully! Please go to login page to login.`,
        { type: "success" }
      );
      reset({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        securityQuestion: "",
        securityAnswer: "",
      });
    },
    onError: (error) => {
      console.error("Error registering user: ", error);
      toast(
        `Failed to register finance manager ${
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
    resolver: yupResolver(financeManagerRegistrationSchema),
  });

  const onSubmit = (
    data: yup.InferType<typeof financeManagerRegistrationSchema>
  ) => {
    if (confirm("Are you sure you want to submit the registration form?")) {
      mutate(data);
    }
    // console.log("data", data);
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
          User Registration
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300",
              errors.name
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300",
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-1">Security Question</label>
          <input
            type="text"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300",
              errors.securityQuestion
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="e.g. What is your mother's maiden name?"
            {...register("securityQuestion")}
          />
          {errors.securityQuestion && (
            <p className="mt-1 text-sm text-red-500">
              {errors.securityQuestion.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Answer to Security Question
          </label>
          <input
            type="text"
            className={classNames(
              "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300",
              errors.securityAnswer
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-300"
            )}
            placeholder="Enter your answer"
            {...register("securityAnswer")}
          />
          {errors.securityAnswer && (
            <p className="mt-1 text-sm text-red-500">
              {errors.securityAnswer.message}
            </p>
          )}
        </div> */}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Register
        </button>

        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};
