import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";

const dir = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const schema = fs.readFileSync(path.join(dir, "schema.sql"), "utf8");
  const seed = fs.readFileSync(path.join(dir, "seed.sql"), "utf8");

  await pool.query(schema);
  console.log("Tables created");

  await pool.query(seed);
  console.log("Seed data added");

  const result = await pool.query(`
    SELECT u.id, u.name, h.name AS hackathon
    FROM hackathon_interests hi
    JOIN users u ON u.id = hi.user_id
    JOIN hackathons h ON h.id = hi.hackathon_id
    WHERE hi.looking_for_team = true
    ORDER BY h.name, u.name
  `);
  console.table(result.rows);

  await pool.end();
}

run().catch((err) => {
  console.error("Database setup failed:", err.message);
  process.exit(1);
});