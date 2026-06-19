import { createContext, useState } from "react";
import type { PageSpinnerProps } from "../types/props";

export const SpinnerContext = createContext({
  showSpinner: () => {},
  hideSpinner: () => {},
});

export const PageSpinnerProvider: React.FC<PageSpinnerProps> = ({
  children,
}) => {
  const [isShowSpinner, setIsShowSpinner] = useState(false);

  return (
    <SpinnerContext.Provider
      value={{
        showSpinner: () => {
          setIsShowSpinner(true);
        },
        hideSpinner: () => {
          setIsShowSpinner(false);
        },
      }}
    >
      {children}
      {isShowSpinner && (
        <div className="fixed w-full h-full z-100 flex items-center justify-center bg-[#f6f3f49e] top-0 left-0">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      )}
    </SpinnerContext.Provider>
  );
};
