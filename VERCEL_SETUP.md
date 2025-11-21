# Vercel Deployment Setup

## Environment Variables

Add these environment variables in your Vercel project settings:

### Required Variables
```
DATABASE_URL=your-production-database-url
ADMIN_EMAIL=ti4@fradema.com.br
ADMIN_PASSWORD=bBhoho123
ADMIN_NAME=Primary Admin
SEED_SECRET=my-super-secret-seed-key-2024
JWT_SECRET=your-jwt-secret-key
```

**Note:** `DIRECT_URL` is not required. The `DATABASE_URL` is sufficient for both queries and migrations.

## Database Setup

### Step 1: Push Schema to Production Database

After deployment, the schema will be automatically pushed via the `vercel-build` script.

### Step 2: Seed the Database

After your first deployment, seed the production database by making a POST request to:

```bash
curl -X POST https://your-app.vercel.app/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret": "my-super-secret-seed-key-2024"}'
```

Or use this JavaScript in your browser console while on your deployed site:

```javascript
fetch('/api/seed', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ secret: 'my-super-secret-seed-key-2024' })
})
.then(r => r.json())
.then(console.log);
```

### Step 3: Login

After seeding, you can login with:
- Email: `ti4@fradema.com.br`
- Password: `bBhoho123`

## Security Notes

- The `/api/seed` endpoint is protected by the `SEED_SECRET` environment variable
- Only run the seed once after initial deployment
- Consider removing or disabling the seed endpoint after initial setup for production security
- Make sure all environment variables are set in Vercel before deployment

## Troubleshooting

If authentication fails:
1. Check that all environment variables are set in Vercel
2. Verify the database connection strings are correct
3. Run the seed endpoint to create the admin user
4. Check Vercel logs for any errors during build or runtime
