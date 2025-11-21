import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse({
        message: "Validation failed",
        details: validation.error.errors,
      });
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse({ message: "Invalid credentials" }, 401);
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return errorResponse({ message: "Invalid credentials" }, 401);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
