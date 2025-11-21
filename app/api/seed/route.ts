import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Security: Only allow seeding with a secret key
    const body = await request.json();
    const { secret } = body;

    if (secret !== process.env.SEED_SECRET) {
      return errorResponse({ message: "Unauthorized" }, 401);
    }

    // Create primary admin user from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminName = process.env.ADMIN_NAME || "Admin User";

    const primaryAdminPassword = await hashPassword(adminPassword);
    const primaryAdmin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: primaryAdminPassword,
        name: adminName,
        role: "ADMIN",
      },
      create: {
        email: adminEmail,
        password: primaryAdminPassword,
        name: adminName,
        role: "ADMIN",
      },
    });

    // Create demo admin user
    const demoAdminPassword = await hashPassword("admin123");
    const demoAdmin = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        password: demoAdminPassword,
        name: "Demo Admin",
        role: "ADMIN",
      },
    });

    // Create regular user
    const userPassword = await hashPassword("user123");
    const user = await prisma.user.upsert({
      where: { email: "user@example.com" },
      update: {},
      create: {
        email: "user@example.com",
        password: userPassword,
        name: "Regular User",
        role: "USER",
      },
    });

    // Create products
    const products = [
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        stock: 50,
        category: "Electronics",
      },
      {
        name: "Smart Watch",
        description: "Fitness tracking smartwatch with heart rate monitor",
        price: 299.99,
        stock: 30,
        category: "Electronics",
      },
      {
        name: "Laptop Stand",
        description: "Ergonomic aluminum laptop stand",
        price: 49.99,
        stock: 100,
        category: "Accessories",
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        price: 149.99,
        stock: 25,
        category: "Electronics",
      },
      {
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with HDMI and card reader",
        price: 39.99,
        stock: 75,
        category: "Accessories",
      },
    ];

    const createdProducts = [];
    for (const product of products) {
      const created = await prisma.product.upsert({
        where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
        update: {},
        create: product,
      });
      createdProducts.push(created.name);
    }

    return successResponse({
      message: "Database seeded successfully",
      users: [primaryAdmin.email, demoAdmin.email, user.email],
      products: createdProducts,
    });
  } catch (error) {
    console.error("Seed error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return errorResponse(
      {
        message: `Failed to seed database: ${errorMessage}`,
      },
      500
    );
  }
}
