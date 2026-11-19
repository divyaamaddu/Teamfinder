import dotenv from "dotenv";
dotenv.config();

const required = ["PORT", "DATABASE_URL"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

export const env = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
};