import pool from "../config/db.js";
import AppError from "../utils/AppError.js";

export async function listHackathons() {
  const { rows } = await pool.query(
    "SELECT id, name, theme, to_char(start_date, 'YYYY-MM-DD') AS start_date FROM hackathons ORDER BY hackathons.start_date"
  );
  return rows;
}

export async function getHackathon(id) {
  const { rows } = await pool.query(
    "SELECT id, name, theme, to_char(start_date, 'YYYY-MM-DD') AS start_date FROM hackathons WHERE id = $1",
    [id]
  );
  if (rows.length === 0) {
    throw new AppError("Hackathon not found", 404);
  }
  return rows[0];
}

export async function addInterest(userId, hackathonId) {
  await getHackathon(hackathonId);

  const { rows } = await pool.query(
    `INSERT INTO hackathon_interests (user_id, hackathon_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, hackathon_id) DO NOTHING
     RETURNING user_id, hackathon_id, looking_for_team`,
    [userId, hackathonId]
  );

  if (rows.length === 0) {
    throw new AppError("You already marked interest in this hackathon", 409);
  }
  return rows[0];
}

export async function removeInterest(userId, hackathonId) {
  await getHackathon(hackathonId);

  const result = await pool.query(
    "DELETE FROM hackathon_interests WHERE user_id = $1 AND hackathon_id = $2",
    [userId, hackathonId]
  );

  if (result.rowCount === 0) {
    throw new AppError("Interest not found", 404);
  }
}

export async function listSeekers(hackathonId) {
  await getHackathon(hackathonId);

  const { rows } = await pool.query(
    `SELECT u.id, u.name
     FROM hackathon_interests hi
     JOIN users u ON u.id = hi.user_id
     WHERE hi.hackathon_id = $1 AND hi.looking_for_team = true
     ORDER BY u.name`,
    [hackathonId]
  );
  return rows;
}