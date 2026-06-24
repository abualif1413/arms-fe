import { type FC } from "react";
import type { ProductProps } from "../types/props";
import { PageErrorMessage } from "./page-error-message";

export const Purchase: FC<ProductProps> = ({
  category = "",
  title = "",
  price = 0,
  description = "",
  imageUrl = "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=800",
  purchases = [],
  onPurchase = () => {},
}) => {
  const purchaseDate = new Date(purchases[0]?.createdAt);

  return (
    <div className="w-[70%] grid grid-cols-2">
      <div className="relative bg-[#F4F4F4] flex items-center justify-center aspect-square md:aspect-auto md:h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 text-[#1A1A1A]">
        <div>
          <span className="block text-xs font-semibold tracking-widest text-[#666666] uppercase mb-3">
            {category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight mb-6 text-[#111111]">
            {title}
          </h1>

          <div className="text-lg font-medium border-b border-gray-200 pb-6 mb-6">
            ${price.toFixed(2)}
          </div>

          <p className="text-sm leading-relaxed text-[#4A4A4A] mb-10 font-light max-w-md">
            {description}
          </p>
        </div>

        <button
          disabled={purchases.length > 0}
          onClick={onPurchase}
          className="w-full bg-black text-white mb-10 py-4 px-6 text-xs font-medium tracking-widest uppercase transition-all duration-300 hover:bg-[#222222] active:scale-[0.99] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Purchase
        </button>

        {purchases.length > 0 && (
          <PageErrorMessage
            message={`You have purchased this item at ${purchaseDate.toLocaleDateString()} and your purchase status is ${purchases[0]?.status}`}
          />
        )}

        <div className="mt-8 border-t border-gray-100 w-12" />
      </div>
    </div>
  );
};
