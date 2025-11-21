import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validations";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const where = user.role === "ADMIN" ? {} : { userId: user.id };

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: { product: true },
        },
        user: {
          select: { id: true, email: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse(orders);
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
    if (!user) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    const body = await request.json();
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse({
        message: "Validation failed",
        details: validation.error.errors,
      });
    }

    const { items } = validation.data;

    // Fetch products and calculate total
    const products = await prisma.product.findMany({
      where: { id: { in: items.map((item) => item.productId) } },
    });

    let total = 0;
    const orderItems = items.map((item) => {
      const product = products.find(
        (p: { id: string }) => p.id === item.productId
      );
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
      total += product.price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    // Create order and update stock
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          total,
          orderItems: {
            create: orderItems,
          },
        },
        include: {
          orderItems: {
            include: { product: true },
          },
        },
      });

      // Update product stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return successResponse(order, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
