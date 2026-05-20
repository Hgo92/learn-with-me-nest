import { betterAuth } from 'better-auth';
import { config } from 'dotenv';
import { Pool } from 'pg';

config();

// Évite de recréer un pool global à chaque fois que NestJS recharge un fichier en dev
const globalRef = global as unknown as { pgPool: Pool };
if (!globalRef.pgPool) {
  globalRef.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 2, // On limite drastiquement pour ne pas saturer Neon en Dev !
  });
}

export const auth = betterAuth({
  database: globalRef.pgPool, // Réutilisation du pool
  trustedOrigins: [
    'http://localhost:5173',
    'https://learnwithme-front.vercel.app',
  ],
  advanced: {
    // N'active secureCookies QUE si on est sur Vercel/Production
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
  user: { modelName: 'users' },
  session: {
    modelName: 'sessions',
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  account: { modelName: 'accounts' },
  verification: { modelName: 'verification' },
  emailAndPassword: { enabled: true },
  plugins: [],
});
