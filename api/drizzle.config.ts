import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infrastructure/database/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Used only locally for generating migrations.
    // Set DATABASE_URL in .env (not committed).
    url: process.env['DATABASE_URL'] ?? '',
  },
});
