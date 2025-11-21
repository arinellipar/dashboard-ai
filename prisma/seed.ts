import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create admin user
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

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
  console.log("Created regular user:", user.email);

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

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: product,
    });
    console.log("Created product:", created.name);
  }

  // Create sample orders
  const productList = await prisma.product.findMany({ take: 2 });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: productList[0].price * 2 + productList[1].price,
      status: "DELIVERED",
      orderItems: {
        create: [
          {
            productId: productList[0].id,
            quantity: 2,
            price: productList[0].price,
          },
          {
            productId: productList[1].id,
            quantity: 1,
            price: productList[1].price,
          },
        ],
      },
    },
  });
  console.log("Created sample order:", order.id);

  console.log("Database seed completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
