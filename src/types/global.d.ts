// Example of a global type definition

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      MONGODB_URL: string;
      USER_EMAIL: string;
      USER_PASS: string;
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}

export {};
