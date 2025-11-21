export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },
  PRODUCTS: {
    LIST: "/api/products",
    DETAIL: (id: string) => `/api/products/${id}`,
  },
  ORDERS: {
    LIST: "/api/orders",
    CREATE: "/api/orders",
  },
  STATS: "/api/stats",
} as const;

export const ORDER_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const JWT_CONFIG = {
  EXPIRES_IN: "7d",
  ALGORITHM: "HS256",
} as const;

export const PASSWORD_CONFIG = {
  MIN_LENGTH: 6,
  SALT_ROUNDS: 12,
} as const;
