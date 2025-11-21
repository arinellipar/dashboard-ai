import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return errorResponse({ message: "Product not found" }, 404);
    }

    return successResponse(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const user = await getUserFromToken(token);
    if (!user || user.role !== "ADMIN") {
      return errorResponse({ message: "Forbidden" }, 403);
    }

    const { id } = await params;
    const body = await request.json();
    const validation = productSchema.partial().safeParse(body);

    if (!validation.success) {
      return errorResponse({
        message: "Validation failed",
        details: validation.error.errors,
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: validation.data,
    });

    return successResponse(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const user = await getUserFromToken(token);
    if (!user || user.role !== "ADMIN") {
      return errorResponse({ message: "Forbidden" }, 403);
    }

    const { id } = await params;
    await prisma.product.delete({ where: { id } });

    return successResponse({ message: "Product deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
