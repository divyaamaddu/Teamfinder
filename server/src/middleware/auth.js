import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

export default async function auth(req, res, next) {
  const header = req.header("authorization") || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Missing or invalid Authorization header", 401);
  }

  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch (err) {
    throw new AppError("Invalid or expired token", 401);
  }

  const { rows } = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [Number(payload.sub)]
  );

  if (rows.length === 0) {
    throw new AppError("User not found", 401);
  }

  req.user = rows[0];
  next();
}