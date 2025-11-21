import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { getUserFromToken } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";
import { z } from "zod";

export const dynamic = "force-dynamic";

const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
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
    const validation = createAdminSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse({
        message: "Validation failed",
        details: validation.error.errors,
      });
    }

    const { email, password, name } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return errorResponse(
        { message: "User with this email already exists" },
        409
      );
    }

    // Create new admin user
    const hashedPassword = await hashPassword(password);
    const newAdmin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return successResponse(
      {
        message: "Admin user created successfully",
        user: newAdmin,
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
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

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse({ users });
  } catch (error) {
    return handleApiError(error);
  }
}
