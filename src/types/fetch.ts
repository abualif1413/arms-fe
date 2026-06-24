export interface UserRegistration {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  authenticationToken: string;
}

export interface FlashSaleResponse {
  flashSaleInfo: FlashSaleInfo | null;
}

export interface FlashSaleInfo {
  product: Product;
  flashSale: FlashSale;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  unit: string;
  availableStock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface FlashSale {
  id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
  purchases: Purchase[];
}

export interface Purchase {
  flashSale?: FlashSale;
  user?: UserRegistration;
  purchaseCode: string;
  status: string;
  message: any;
  id: string;
  createdAt: string;
  updatedAt: string;
}
