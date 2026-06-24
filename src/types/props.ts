import type { Purchase } from "./fetch";

export interface PageSpinnerProps {
  children: React.ReactNode;
}
export interface PageErrorMessageProps {
  message: string;
}

export interface ProductProps {
  category?: string;
  title?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  purchases?: Purchase[];
  onPurchase?: () => void;
}
