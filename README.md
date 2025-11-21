# E-Commerce Dashboard

A comprehensive, production-ready e-commerce dashboard built with modern web technologies, showcasing best practices in full-stack development.

## 🚀 Features

- **TypeScript Throughout**: Strict mode enabled for maximum type safety
- **Authentication**: JWT-based authentication with secure password hashing
- **RESTful API**: Well-structured API with comprehensive error handling
- **Database**: PostgreSQL with Prisma ORM and Supabase integration
- **Testing**: Jest + React Testing Library with 80%+ code coverage
- **CI/CD**: Automated testing and deployment with GitHub Actions
- **Docker**: Containerized application for consistent deployments
- **Performance**: Optimized for perfect Lighthouse scores
- **Modern UI**: Built with Next.js 16, React 19, and Tailwind CSS 4

## 📋 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Robust relational database
- **Supabase** - Backend-as-a-Service platform
- **JWT** - Secure authentication tokens
- **Zod** - Schema validation

### Testing & Quality
- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **TypeScript Strict Mode** - Enhanced type checking

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Deployment platform
- **Lighthouse CI** - Performance monitoring

## 🏗️ Architecture

### Database Schema

```prisma
User (id, email, password, name, role)
  ↓ 1:N
Order (id, userId, status, total)
  ↓ 1:N
OrderItem (id, orderId, productId, quantity, price)
  ↓ N:1
Product (id, name, description, price, stock, category)
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Products
- `GET /api/products` - List products (with pagination)
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/[id]` - Update product (Admin only)
- `DELETE /api/products/[id]` - Delete product (Admin only)

#### Orders
- `GET /api/orders` - List orders (user's own or all for admin)
- `POST /api/orders` - Create new order

#### Statistics
- `GET /api/stats` - Dashboard statistics (Admin only)

### Error Handling

All API endpoints follow a consistent error response format:

```typescript
{
  success: false,
  error: {
    message: string,
    code?: string,
    details?: unknown
  }
}
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10.23+
- PostgreSQL 16+
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-dashboard
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
```

4. Generate Prisma Client and run migrations:
```bash
pnpm prisma:generate
pnpm prisma:migrate
```

5. Seed the database (optional):
```bash
pnpm prisma db seed
```

6. Start the development server:
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

Run all tests with coverage:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

Coverage threshold is set to 80% for:
- Branches
- Functions
- Lines
- Statements

## 🐳 Docker

Build the Docker image:
```bash
pnpm docker:build
```

Run the container:
```bash
pnpm docker:run
```

Or use Docker Compose:
```bash
docker-compose up
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
pnpm build
pnpm start
```

## 📊 Performance

The application is optimized for perfect Lighthouse scores:

- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

Optimizations include:
- Server-side rendering
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies

## 🔒 Security

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with expiration
- SQL injection prevention via Prisma
- XSS protection
- CSRF protection
- Rate limiting (recommended for production)
- Environment variable validation

## 📝 API Documentation

### Authentication Flow

1. User registers via `/api/auth/register`
2. Server hashes password and creates user
3. Server generates JWT token
4. Client stores token in localStorage
5. Client includes token in Authorization header for protected routes

### Authorization Levels

- **Public**: Product listing, product details
- **Authenticated**: Create orders, view own orders
- **Admin**: Create/update/delete products, view all orders, view statistics

## 🧩 Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication utilities
│   ├── prisma.ts        # Prisma client
│   └── validations.ts   # Zod schemas
├── prisma/
│   └── schema.prisma    # Database schema
├── __tests__/           # Test files
├── .github/
│   └── workflows/       # CI/CD pipelines
├── Dockerfile           # Docker configuration
└── package.json         # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Prisma for the excellent ORM
- Supabase for backend infrastructure

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
