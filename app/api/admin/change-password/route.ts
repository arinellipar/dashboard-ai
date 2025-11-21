import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { getUserFromToken } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";
import { z } from "zod";

export const dynamic = "force-dynamic";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const user = await getUserFromToken(token);
    if (!user || user.role !== "ADMIN") {
      return errorResponse(
        { message: "Forbidden - Admin access required" },
        403
      );
    }

    const body = await request.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse({
        message: "Validation failed",
        details: validation.error.errors,
      });
    }

    const { currentPassword, newPassword } = validation.data;

    // Get user with password
    const userWithPassword = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userWithPassword) {
      return errorResponse({ message: "User not found" }, 404);
    }

    // Verify current password
    const isValidPassword = await verifyPassword(
      currentPassword,
      userWithPassword.password
    );

    if (!isValidPassword) {
      return errorResponse({ message: "Current password is incorrect" }, 401);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return successResponse({
      message: "Password changed successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
