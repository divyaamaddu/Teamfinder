import pool from "../config/db.js";
import AppError from "../utils/AppError.js";

export default async function auth(req, res, next) {
  const id = Number(req.header("x-user-id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Missing or invalid x-user-id header", 401);
  }

  const { rows } = await pool.query(
    "SELECT id, name FROM users WHERE id = $1",
    [id]
  );

  if (rows.length === 0) {
    throw new AppError("User not found", 401);
  }

  req.user = rows[0];
  next();
}