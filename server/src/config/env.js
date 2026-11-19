import dotenv from "dotenv";
dotenv.config();

const required = ["PORT"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

export const env = {
  port: process.env.PORT,
};