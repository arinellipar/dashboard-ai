# Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Supabase account (free tier works)
- Domain name (optional)

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to Project Settings → API
4. Copy the following values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`
5. Go to Project Settings → Database
6. Copy the connection string → `DATABASE_URL`
7. Modify the connection string to add `?pgbouncer=true` for connection pooling
8. Create a direct connection string (without pgbouncer) → `DIRECT_URL`

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: E-commerce dashboard"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET` (generate a secure random string)
5. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add JWT_SECRET

# Deploy to production
vercel --prod
```

## Step 4: Run Database Migrations

After deployment, you need to run Prisma migrations on your production database:

```bash
# Set DATABASE_URL to your production database
export DATABASE_URL="your-production-database-url"

# Run migrations
pnpm prisma migrate deploy

# Seed the database (optional)
pnpm prisma:seed
```

Or use Vercel's build command:

In Vercel project settings → Build & Development Settings:
- Build Command: `pnpm prisma migrate deploy && pnpm build`

## Step 5: Configure Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Wait for SSL certificate provisioning

## Step 6: Set Up Monitoring

### Vercel Analytics

1. Go to your project in Vercel
2. Navigate to "Analytics"
3. Enable Web Analytics
4. Add the analytics script to your app (already included in Next.js)

### Sentry (Optional)

```bash
pnpm add @sentry/nextjs

# Initialize Sentry
npx @sentry/wizard@latest -i nextjs
```

## Environment Variables Reference

### Required

- `DATABASE_URL` - PostgreSQL connection string with pgbouncer
- `DIRECT_URL` - Direct PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens (min 32 characters)

### Optional

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_APP_URL` - Your app URL (auto-detected on Vercel)

## Post-Deployment Checklist

- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Lighthouse scores checked (90+)
- [ ] API endpoints tested
- [ ] Authentication working
- [ ] Database seeded with initial data

## Troubleshooting

### Build Fails

**Issue**: Prisma client not generated
**Solution**: Add `prisma generate` to build command:
```bash
pnpm prisma generate && pnpm build
```

**Issue**: Environment variables not found
**Solution**: Check that all required env vars are set in Vercel

### Database Connection Issues

**Issue**: Connection timeout
**Solution**: Use connection pooling (pgbouncer) in DATABASE_URL

**Issue**: Too many connections
**Solution**: Set connection limit in Prisma schema:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
  relationMode = "prisma"
}
```

### Authentication Issues

**Issue**: JWT verification fails
**Solution**: Ensure JWT_SECRET is the same across all deployments

**Issue**: CORS errors
**Solution**: Add your domain to allowed origins in middleware

## Scaling Considerations

### Database

- Enable connection pooling (pgbouncer)
- Add read replicas for heavy read workloads
- Implement caching layer (Redis)
- Optimize slow queries

### Application

- Enable Vercel Edge Functions for low latency
- Use ISR (Incremental Static Regeneration) for product pages
- Implement CDN caching for static assets
- Add rate limiting for API routes

### Monitoring

- Set up alerts for error rates
- Monitor database performance
- Track API response times
- Monitor memory usage

## Rollback Procedure

If deployment fails:

```bash
# Revert to previous deployment
vercel rollback

# Or redeploy a specific commit
vercel --prod --force
```

## Continuous Deployment

GitHub Actions automatically:
- Runs tests on every PR
- Builds the application
- Runs Lighthouse CI
- Deploys to Vercel on merge to main

Preview deployments are created for every PR.

## Security Checklist

- [ ] Environment variables secured
- [ ] JWT secret is strong and unique
- [ ] Database credentials rotated regularly
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma)
- [ ] XSS prevention (React)
- [ ] CSRF protection enabled

## Performance Optimization

- [ ] Images optimized with Next.js Image
- [ ] Code splitting enabled
- [ ] Lazy loading implemented
- [ ] Database queries optimized
- [ ] Caching strategy implemented
- [ ] CDN configured
- [ ] Compression enabled
- [ ] Lighthouse score 90+

## Support

For issues or questions:
- Check GitHub Issues
- Review Vercel documentation
- Check Supabase documentation
- Review Prisma documentation
