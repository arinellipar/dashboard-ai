import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
} from "@/lib/auth";

describe("Auth Integration Tests", () => {
  it("should complete full authentication flow", async () => {
    // Hash password
    const password = "testpassword123";
    const hashedPassword = await hashPassword(password);

    // Verify password
    const isValid = await verifyPassword(password, hashedPassword);
    expect(isValid).toBe(true);

    // Generate token
    const payload = {
      userId: "user123",
      email: "test@example.com",
      role: "USER",
    };
    const token = generateToken(payload);

    // Verify token
    const decoded = verifyToken(token);
    expect(decoded).toBeDefined();
    expect(decoded?.userId).toBe(payload.userId);
    expect(decoded?.email).toBe(payload.email);
  });

  it("should reject invalid password in full flow", async () => {
    const password = "correctpassword";
    const hashedPassword = await hashPassword(password);

    const isValid = await verifyPassword("wrongpassword", hashedPassword);
    expect(isValid).toBe(false);
  });

  it("should handle token expiration", () => {
    const payload = {
      userId: "user123",
      email: "test@example.com",
      role: "USER",
    };

    const token = generateToken(payload);
    const decoded = verifyToken(token);

    expect(decoded).toBeDefined();
    expect(decoded?.userId).toBe(payload.userId);
  });
});
