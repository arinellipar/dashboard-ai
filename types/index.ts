import {
  User,
  Product,
  Order,
  OrderItem,
  Role,
  OrderStatus,
} from "@prisma/client";

export type { User, Product, Order, OrderItem, Role, OrderStatus };

export interface UserWithoutPassword extends Omit<User, "password"> {}

export interface OrderWithItems extends Order {
  orderItems: (OrderItem & {
    product: Product;
  })[];
  user?: UserWithoutPassword;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: OrderWithItems[];
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
}

export interface AuthResponse {
  user: UserWithoutPassword;
  token: string;
}
