CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hackathons (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  theme TEXT,
  start_date DATE
);

CREATE TABLE IF NOT EXISTS hackathon_interests (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hackathon_id INT NOT NULL REFERENCES hackathons(id) ON DELETE CASCADE,
  looking_for_team BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (user_id, hackathon_id)
);