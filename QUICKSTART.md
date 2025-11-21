# Quick Start Guide

Get your e-commerce dashboard up and running in 5 minutes!

## Prerequisites

- Node.js 20+ installed
- pnpm 10.23+ installed
- Docker installed (for database)

## Step 1: Clone and Install (1 min)

```bash
# Clone the repository
git clone <your-repo-url>
cd ecommerce-dashboard

# Install dependencies
pnpm install
```

## Step 2: Set Up Database (2 min)

```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Wait for database to be ready (check with)
docker-compose ps

# Copy environment variables
cp .env.example .env.local

# Generate Prisma Client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Seed the database with sample data
pnpm prisma:seed
```

## Step 3: Start Development Server (1 min)

```bash
# Start the development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 4: Test the Application (1 min)

### Demo Credentials

**Admin User:**
- Email: `admin@example.com`
- Password: `admin123`

**Regular User:**
- Email: `user@example.com`
- Password: `user123`

### Test API Endpoints

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'

# Get products (no auth required)
curl http://localhost:3000/api/products

# Get dashboard stats (requires admin token)
curl http://localhost:3000/api/stats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Step 5: Run Tests (Optional)

```bash
# Run all tests with coverage
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Common Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run linter

# Database
pnpm prisma:generate        # Generate Prisma Client
pnpm prisma:migrate         # Run migrations
pnpm prisma:studio          # Open Prisma Studio
pnpm prisma:seed            # Seed database

# Testing
pnpm test                   # Run tests with coverage
pnpm test:watch             # Run tests in watch mode

# Docker
pnpm docker:build           # Build Docker image
pnpm docker:run             # Run Docker container
docker-compose up           # Start all services
docker-compose down         # Stop all services
```

## Project Structure

```
ecommerce-dashboard/
├── app/                    # Next.js pages and API routes
├── components/             # React components
├── lib/                    # Utility functions
├── prisma/                 # Database schema and migrations
├── __tests__/             # Test files
└── types/                  # TypeScript types
```

## Troubleshooting

### Database Connection Error

**Problem**: Can't connect to database
**Solution**:
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Port Already in Use

**Problem**: Port 3000 is already in use
**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

### Prisma Client Not Generated

**Problem**: Module '@prisma/client' not found
**Solution**:
```bash
pnpm prisma:generate
```

### Environment Variables Not Loaded

**Problem**: Environment variables are undefined
**Solution**:
```bash
# Make sure .env.local exists
cp .env.example .env.local

# Restart the dev server
pnpm dev
```

## Next Steps

1. **Explore the Dashboard**
   - Visit `/dashboard` to see the admin interface
   - View products, orders, and statistics

2. **Read the Documentation**
   - `README.md` - Comprehensive guide
   - `ARCHITECTURE.md` - Technical decisions
   - `DEPLOYMENT.md` - Production deployment

3. **Customize the Application**
   - Modify the database schema in `prisma/schema.prisma`
   - Add new API routes in `app/api/`
   - Create new components in `components/`

4. **Deploy to Production**
   - Follow `DEPLOYMENT.md` for Vercel deployment
   - Or use Docker for self-hosting

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Support

- 📖 Check the [README](README.md) for detailed documentation
- 🐛 Report bugs via [GitHub Issues](https://github.com/yourusername/ecommerce-dashboard/issues)
- 💬 Ask questions in [GitHub Discussions](https://github.com/yourusername/ecommerce-dashboard/discussions)

---

Happy coding! 🚀
