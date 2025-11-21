import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";
import { getUserFromToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const user = await getUserFromToken(token);
    if (!user || user.role !== "ADMIN") {
      return errorResponse({ message: "Forbidden" }, 403);
    }

    const [totalProducts, totalOrders, totalRevenue, recentOrders] =
      await Promise.all([
        prisma.product.count(),
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: { total: true },
        }),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { email: true, name: true },
            },
            orderItems: {
              include: { product: true },
            },
          },
        }),
      ]);

    return successResponse({
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
