import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * 🌐 Server-side environment variables (never exposed to the client)
   */
  server: {
    DATABASE_URL: z.string().url(),
    WEB_A_URL: z.string().url(),
    WEB_A_API_KEY: z.string().optional(),
    CLERK_SECRET_KEY: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * 💻 Client-side environment variables (exposed via NEXT_PUBLIC_ prefix)
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },

  /**
   * 🧠 Runtime Environment: maps actual process.env vars
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    WEB_A_URL: process.env.WEB_A_URL,
    WEB_A_API_KEY: process.env.WEB_A_API_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
