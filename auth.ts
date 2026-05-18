import { betterAuth } from 'better-auth';
import { config } from 'dotenv';
import { Pool } from 'pg';

config();

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  trustedOrigins: ['http://localhost:5173'],
  user: {
    modelName: 'users',
  },
  session: {
    modelName: 'sessions',
  },
  account: {
    modelName: 'accounts',
  },
  verification: {
    modelName: 'verification', // adapte selon ton nom de table exact
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [],
});
