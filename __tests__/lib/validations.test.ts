import {
  loginSchema,
  registerSchema,
  productSchema,
  orderSchema,
} from "@/lib/validations";

describe("Validation Schemas", () => {
  describe("loginSchema", () => {
    it("should validate correct login data", () => {
      const data = {
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const data = {
        email: "invalid-email",
        password: "password123",
      };

      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const data = {
        email: "test@example.com",
        password: "12345",
      };

      const result = loginSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("productSchema", () => {
    it("should validate correct product data", () => {
      const data = {
        name: "Test Product",
        description: "A test product",
        price: 29.99,
        stock: 100,
        category: "Electronics",
      };

      const result = productSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject negative price", () => {
      const data = {
        name: "Test Product",
        price: -10,
        stock: 100,
        category: "Electronics",
      };

      const result = productSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject negative stock", () => {
      const data = {
        name: "Test Product",
        price: 29.99,
        stock: -5,
        category: "Electronics",
      };

      const result = productSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("orderSchema", () => {
    it("should validate correct order data", () => {
      const data = {
        items: [
          { productId: "prod1", quantity: 2 },
          { productId: "prod2", quantity: 1 },
        ],
      };

      const result = orderSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject empty items array", () => {
      const data = {
        items: [],
      };

      const result = orderSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject zero quantity", () => {
      const data = {
        items: [{ productId: "prod1", quantity: 0 }],
      };

      const result = orderSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
