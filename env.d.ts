declare module "bun" {
  interface Env {
    PORT?: string;
    NODE_ENV?: "development" | "production" | "test";
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    API_KEY: string;
  }
}
