import {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  DatabaseError,
} from "@/lib/errors";

describe("Error Classes", () => {
  describe("AppError", () => {
    it("should create an error with message and status code", () => {
      const error = new AppError("Test error", 500);

      expect(error.message).toBe("Test error");
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe("AppError");
    });

    it("should include error code if provided", () => {
      const error = new AppError("Test error", 500, "TEST_ERROR");

      expect(error.code).toBe("TEST_ERROR");
    });
  });

  describe("ValidationError", () => {
    it("should create a validation error with 400 status", () => {
      const error = new ValidationError("Invalid input");

      expect(error.message).toBe("Invalid input");
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe("VALIDATION_ERROR");
    });

    it("should include validation details", () => {
      const details = { field: "email", message: "Invalid email" };
      const error = new ValidationError("Validation failed", details);

      expect(error.details).toEqual(details);
    });
  });

  describe("AuthenticationError", () => {
    it("should create an authentication error with 401 status", () => {
      const error = new AuthenticationError();

      expect(error.statusCode).toBe(401);
      expect(error.code).toBe("AUTHENTICATION_ERROR");
    });

    it("should accept custom message", () => {
      const error = new AuthenticationError("Invalid credentials");

      expect(error.message).toBe("Invalid credentials");
    });
  });

  describe("AuthorizationError", () => {
    it("should create an authorization error with 403 status", () => {
      const error = new AuthorizationError();

      expect(error.statusCode).toBe(403);
      expect(error.code).toBe("AUTHORIZATION_ERROR");
    });
  });

  describe("NotFoundError", () => {
    it("should create a not found error with 404 status", () => {
      const error = new NotFoundError("User");

      expect(error.message).toBe("User not found");
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe("NOT_FOUND");
    });
  });

  describe("ConflictError", () => {
    it("should create a conflict error with 409 status", () => {
      const error = new ConflictError("User already exists");

      expect(error.message).toBe("User already exists");
      expect(error.statusCode).toBe(409);
      expect(error.code).toBe("CONFLICT");
    });
  });

  describe("DatabaseError", () => {
    it("should create a database error with 500 status", () => {
      const error = new DatabaseError();

      expect(error.statusCode).toBe(500);
      expect(error.code).toBe("DATABASE_ERROR");
    });
  });
});
