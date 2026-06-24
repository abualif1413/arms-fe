import { useContext, useEffect, useMemo, type FC } from "react";
import { PageErrorMessage } from "./page-error-message";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getRecentFlashSale,
  getTodayFlashSale,
  getUpcomingFlashSale,
  purchase,
} from "../utils/fetch";
import { SpinnerContext } from "./page-spinner";
import { Purchase } from "./purchase";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

const dateToCategory = (startDate: Date, endDate: Date) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  return `Available from ${date1.toLocaleDateString()} to ${date2.toLocaleDateString()}`;
};

export const FlashSale: FC = () => {
  const { showSpinner, hideSpinner } = useContext(SpinnerContext);

  const {
    data: todayFlashSale,
    refetch: refetchTodayFlashSale,
    isLoading: isTodayFlashSaleLoading,
  } = useQuery({
    queryKey: ["today-flash-sale"],
    queryFn: () => getTodayFlashSale(),
  });

  const { data: recentFlashSale, isLoading: isRecentFlashSaleLoading } =
    useQuery({
      queryKey: ["recent-flash-sale"],
      queryFn: () => getRecentFlashSale(),
    });

  const { data: upcomingFlashSale, isLoading: isUpcomingFlashSaleLoading } =
    useQuery({
      queryKey: ["upcoming-flash-sale"],
      queryFn: () => getUpcomingFlashSale(),
    });

  const { mutate: addPurchase, isPending: isAddPurchaseLoading } = useMutation({
    mutationKey: ["add-purchase"],
    mutationFn: purchase,
    onSuccess: () => {
      toast("Flash sale purchase has been successfully saved", {
        type: "success",
      });
      refetchTodayFlashSale();
    },
    onError: (error) => {
      console.error("Login failed: ", error);
      toast(
        ` Error when proceeding the flash sale purchase: ${
          (error as AxiosError<{ message: string; statusCode: number }>)
            .response?.data.message
        }`,
        {
          type: "error",
        },
      );
    },
  });

  const onPurchase = () => {
    if (todayFlashSale?.data.flashSaleInfo?.flashSale.id) {
      if (confirm("Are you sure want to proceed this purchase")) {
        addPurchase(todayFlashSale?.data.flashSaleInfo?.flashSale.id);
      }
    }
  };

  const isLoading = useMemo(
    () =>
      isTodayFlashSaleLoading ||
      isRecentFlashSaleLoading ||
      isUpcomingFlashSaleLoading ||
      isAddPurchaseLoading,
    [
      isTodayFlashSaleLoading,
      isRecentFlashSaleLoading,
      isUpcomingFlashSaleLoading,
      isAddPurchaseLoading,
    ],
  );

  useEffect(() => {
    if (isLoading) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, [isLoading]);

  const flashSaleInformation = useMemo(() => {
    if (!todayFlashSale || !recentFlashSale || !upcomingFlashSale) {
      return "";
    }

    if (todayFlashSale.data.flashSaleInfo) {
      return "";
    }

    const information = [];
    if (recentFlashSale.data.flashSaleInfo) {
      const date = new Date(
        recentFlashSale.data.flashSaleInfo.flashSale.endDate,
      );
      information.push(
        `THE RECENT FLASH SALE HAS ENDED AT ${date.toLocaleDateString()}`,
      );
    }
    if (upcomingFlashSale.data.flashSaleInfo) {
      const date = new Date(
        upcomingFlashSale.data.flashSaleInfo.flashSale.startDate,
      );
      information.push(
        `THE UPCOMING FLASH SALE IS ${date.toLocaleDateString()}`,
      );
    }

    if (information.length === 0) {
      return "NO FLASH SALE DATA FOUND";
    } else {
      return information.join(" AND ");
    }
  }, [todayFlashSale, recentFlashSale, upcomingFlashSale]);

  if (isLoading) {
    return null;
  }

  if (!todayFlashSale?.data.flashSaleInfo) {
    return <PageErrorMessage message={flashSaleInformation} />;
  }

  return (
    <Purchase
      category={dateToCategory(
        todayFlashSale.data.flashSaleInfo.flashSale
          .startDate as unknown as Date,
        todayFlashSale.data.flashSaleInfo.flashSale.endDate as unknown as Date,
      )}
      title={todayFlashSale.data.flashSaleInfo.product.name}
      price={todayFlashSale.data.flashSaleInfo.product.price}
      description={todayFlashSale.data.flashSaleInfo.product.description}
      purchases={todayFlashSale.data.flashSaleInfo.flashSale.purchases}
      onPurchase={onPurchase}
    />
  );
};
