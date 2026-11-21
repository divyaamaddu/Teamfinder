import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

const SALT_ROUNDS = 10;

export async function registerUser({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING
     RETURNING id, name, email`,
    [name, email, passwordHash]
  );

  if (rows.length === 0) {
    throw new AppError("Email is already registered", 409);
  }
  return rows[0];
}

export async function loginUser({ email, password }) {
  const { rows } = await pool.query(
    "SELECT id, name, email, password_hash FROM users WHERE email = $1",
    [email]
  );

  const user = rows[0];
  const passwordOk = user
    ? await bcrypt.compare(password, user.password_hash)
    : false;

  if (!passwordOk) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign({ sub: String(user.id) }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}