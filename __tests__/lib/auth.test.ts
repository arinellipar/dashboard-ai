import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
} from "@/lib/auth";

describe("Auth Library", () => {
  describe("hashPassword", () => {
    it("should hash a password", async () => {
      const password = "testpassword123";
      const hashed = await hashPassword(password);

      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(0);
    });

    it("should generate different hashes for the same password", async () => {
      const password = "testpassword123";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("verifyPassword", () => {
    it("should verify correct password", async () => {
      const password = "testpassword123";
      const hashed = await hashPassword(password);
      const isValid = await verifyPassword(password, hashed);

      expect(isValid).toBe(true);
    });

    it("should reject incorrect password", async () => {
      const password = "testpassword123";
      const hashed = await hashPassword(password);
      const isValid = await verifyPassword("wrongpassword", hashed);

      expect(isValid).toBe(false);
    });
  });

  describe("generateToken", () => {
    it("should generate a valid JWT token", () => {
      const payload = {
        userId: "user123",
        email: "test@example.com",
        role: "USER",
      };

      const token = generateToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3);
    });
  });

  describe("verifyToken", () => {
    it("should verify and decode a valid token", () => {
      const payload = {
        userId: "user123",
        email: "test@example.com",
        role: "USER",
      };

      const token = generateToken(payload);
      const decoded = verifyToken(token);

      expect(decoded).toBeDefined();
      expect(decoded?.userId).toBe(payload.userId);
      expect(decoded?.email).toBe(payload.email);
      expect(decoded?.role).toBe(payload.role);
    });

    it("should return null for invalid token", () => {
      const decoded = verifyToken("invalid.token.here");

      expect(decoded).toBeNull();
    });
  });
});
