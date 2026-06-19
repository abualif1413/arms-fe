import type { FC } from "react";
import type { PageErrorMessageProps } from "../types/props";
import { ErrorIcon } from "./svgs/error-icon";

export const PageErrorMessage: FC<PageErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-6 bg-gray-50 rounded-lg border border-gray-200">
      <ErrorIcon />
      <p className="text-gray-600 text-center text-base">{message}</p>
    </div>
  );
};
