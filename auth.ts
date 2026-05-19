import { betterAuth } from 'better-auth';
import { config } from 'dotenv';
import { Pool } from 'pg';

config();

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  trustedOrigins: ['http://localhost:5173'],
  advanced: {
    useSecureCookies: true,
  },
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
    modelName: 'verification',
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [],
});
