import { betterAuth } from 'better-auth';
import { config } from 'dotenv';
import { Pool } from 'pg';
import { username } from 'better-auth/plugins';

config();

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  modelName: {
    user: 'users',
    session: 'sessions',
    account: 'accounts',
    verification: 'verification',
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});
