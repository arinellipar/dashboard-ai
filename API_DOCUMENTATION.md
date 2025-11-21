# API Documentation

Complete API reference for the E-Commerce Dashboard.

## Base URL

```
Development: http://localhost:3000
Production: https://your-domain.vercel.app
```

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe" // optional
}
```

**Validation Rules:**
- `email`: Valid email format
- `password`: Minimum 6 characters
- `name`: Minimum 2 characters (optional)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx1234567890",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (409):**
```json
{
  "success": false,
  "error": {
    "message": "User already exists",
    "code": "CONFLICT"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

---

### Login User

Authenticate a user and receive a JWT token.

**Endpoint:** `POST /api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx1234567890",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid credentials",
    "code": "AUTHENTICATION_ERROR"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

## Product Endpoints

### List Products

Get a paginated list of products with optional filtering.

**Endpoint:** `GET /api/products`

**Authentication:** Not required

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `category` (optional): Filter by category

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "clx1234567890",
        "name": "Wireless Headphones",
        "description": "High-quality wireless headphones",
        "price": 199.99,
        "stock": 50,
        "category": "Electronics",
        "imageUrl": null,
        "createdAt": "2024-11-21T10:00:00.000Z",
        "updatedAt": "2024-11-21T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

**Example:**
```bash
# Get first page
curl http://localhost:3000/api/products

# Get second page with 20 items
curl http://localhost:3000/api/products?page=2&limit=20

# Filter by category
curl http://localhost:3000/api/products?category=Electronics
```

---

### Get Product

Get details of a specific product.

**Endpoint:** `GET /api/products/:id`

**Authentication:** Not required

**URL Parameters:**
- `id`: Product ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones",
    "price": 199.99,
    "stock": 50,
    "category": "Electronics",
    "imageUrl": null,
    "createdAt": "2024-11-21T10:00:00.000Z",
    "updatedAt": "2024-11-21T10:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "message": "Product not found",
    "code": "NOT_FOUND"
  }
}
```

**Example:**
```bash
curl http://localhost:3000/api/products/clx1234567890
```

---

### Create Product

Create a new product (Admin only).

**Endpoint:** `POST /api/products`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "price": 199.99,
  "stock": 50,
  "category": "Electronics",
  "imageUrl": "https://example.com/image.jpg" // optional
}
```

**Validation Rules:**
- `name`: Required, minimum 1 character
- `description`: Optional
- `price`: Required, positive number
- `stock`: Required, non-negative integer
- `category`: Required, minimum 1 character
- `imageUrl`: Optional, valid URL

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones",
    "price": 199.99,
    "stock": 50,
    "category": "Electronics",
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2024-11-21T10:00:00.000Z",
    "updatedAt": "2024-11-21T10:00:00.000Z"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones",
    "price": 199.99,
    "stock": 50,
    "category": "Electronics"
  }'
```

---

### Update Product

Update an existing product (Admin only).

**Endpoint:** `PUT /api/products/:id`

**Authentication:** Required (Admin)

**URL Parameters:**
- `id`: Product ID

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Product Name",
  "price": 249.99,
  "stock": 75
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "name": "Updated Product Name",
    "description": "High-quality wireless headphones",
    "price": 249.99,
    "stock": 75,
    "category": "Electronics",
    "imageUrl": null,
    "createdAt": "2024-11-21T10:00:00.000Z",
    "updatedAt": "2024-11-21T11:00:00.000Z"
  }
}
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/products/clx1234567890 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "price": 249.99,
    "stock": 75
  }'
```

---

### Delete Product

Delete a product (Admin only).

**Endpoint:** `DELETE /api/products/:id`

**Authentication:** Required (Admin)

**URL Parameters:**
- `id`: Product ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Product deleted"
  }
}
```

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/products/clx1234567890 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## Order Endpoints

### List Orders

Get a list of orders. Regular users see only their orders, admins see all orders.

**Endpoint:** `GET /api/orders`

**Authentication:** Required

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx9876543210",
      "userId": "clx1234567890",
      "status": "DELIVERED",
      "total": 649.97,
      "createdAt": "2024-11-21T10:00:00.000Z",
      "updatedAt": "2024-11-21T12:00:00.000Z",
      "user": {
        "id": "clx1234567890",
        "email": "user@example.com",
        "name": "John Doe"
      },
      "orderItems": [
        {
          "id": "clx1111111111",
          "orderId": "clx9876543210",
          "productId": "clx2222222222",
          "quantity": 2,
          "price": 199.99,
          "createdAt": "2024-11-21T10:00:00.000Z",
          "product": {
            "id": "clx2222222222",
            "name": "Wireless Headphones",
            "description": "High-quality wireless headphones",
            "price": 199.99,
            "stock": 48,
            "category": "Electronics",
            "imageUrl": null
          }
        }
      ]
    }
  ]
}
```

**Example:**
```bash
curl http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### Create Order

Create a new order with multiple items.

**Endpoint:** `POST /api/orders`

**Authentication:** Required

**Request Body:**
```json
{
  "items": [
    {
      "productId": "clx2222222222",
      "quantity": 2
    },
    {
      "productId": "clx3333333333",
      "quantity": 1
    }
  ]
}
```

**Validation Rules:**
- `items`: Required, minimum 1 item
- `items[].productId`: Required, valid product ID
- `items[].quantity`: Required, positive integer

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "clx9876543210",
    "userId": "clx1234567890",
    "status": "PENDING",
    "total": 649.97,
    "createdAt": "2024-11-21T10:00:00.000Z",
    "updatedAt": "2024-11-21T10:00:00.000Z",
    "orderItems": [
      {
        "id": "clx1111111111",
        "orderId": "clx9876543210",
        "productId": "clx2222222222",
        "quantity": 2,
        "price": 199.99,
        "createdAt": "2024-11-21T10:00:00.000Z",
        "product": {
          "id": "clx2222222222",
          "name": "Wireless Headphones",
          "price": 199.99,
          "stock": 48
        }
      }
    ]
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": {
    "message": "Insufficient stock for Wireless Headphones"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "items": [
      {
        "productId": "clx2222222222",
        "quantity": 2
      }
    ]
  }'
```

---

## Statistics Endpoint

### Get Dashboard Statistics

Get dashboard statistics including total products, orders, revenue, and recent orders (Admin only).

**Endpoint:** `GET /api/stats`

**Authentication:** Required (Admin)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalProducts": 25,
    "totalOrders": 150,
    "totalRevenue": 45678.90,
    "recentOrders": [
      {
        "id": "clx9876543210",
        "userId": "clx1234567890",
        "status": "DELIVERED",
        "total": 649.97,
        "createdAt": "2024-11-21T10:00:00.000Z",
        "user": {
          "email": "user@example.com",
          "name": "John Doe"
        },
        "orderItems": [...]
      }
    ]
  }
}
```

**Example:**
```bash
curl http://localhost:3000/api/stats \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `AUTHENTICATION_ERROR` | Authentication failed or token invalid |
| `AUTHORIZATION_ERROR` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `CONFLICT` | Resource already exists |
| `DATABASE_ERROR` | Database operation failed |

---

## Rate Limiting

Currently, there are no rate limits in development. For production, consider implementing:

- 100 requests per minute per IP for public endpoints
- 1000 requests per minute per user for authenticated endpoints
- 10 requests per minute for authentication endpoints

---

## Webhooks (Future)

Webhook support is planned for:
- Order status changes
- Low stock alerts
- New user registrations

---

## SDK Examples

### JavaScript/TypeScript

```typescript
const API_URL = 'http://localhost:3000';

// Login
async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// Get products
async function getProducts(page = 1, limit = 10) {
  const response = await fetch(
    `${API_URL}/api/products?page=${page}&limit=${limit}`
  );
  return response.json();
}

// Create order
async function createOrder(token: string, items: any[]) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });
  return response.json();
}
```

---

## Postman Collection

Import this collection into Postman for easy API testing:

[Download Postman Collection](./postman_collection.json) (Coming soon)

---

## Support

For API questions or issues:
- Check the [README](README.md)
- Open an issue on GitHub
- Join our Discord community

---

**Last Updated:** November 21, 2024
