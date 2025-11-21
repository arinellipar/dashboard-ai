import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";
import { getUserFromToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where = category ? { category } : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return successResponse({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const user = await getUserFromToken(token);
    if (!user || user.role !== "ADMIN") {
      return errorResponse({ message: "Forbidden" }, 403);
    }

    const body = await request.json();
    const validation = productSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse({
        message: "Validation failed",
        details: validation.error.errors,
      });
    }

    const product = await prisma.product.create({
      data: validation.data,
    });

    return successResponse(product, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
