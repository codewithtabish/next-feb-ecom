import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
// import {} from './src/configs/schemas'

export default defineConfig({
  out: './drizzle',
  schema: './src/configs/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
});
