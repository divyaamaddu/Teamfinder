INSERT INTO users (name, email, password_hash) VALUES
  ('Ravi', 'ravi@example.com', 'demo-hash'),
  ('Sai', 'sai@example.com', 'demo-hash'),
  ('Priya', 'priya@example.com', 'demo-hash'),
  ('Kiran', 'kiran@example.com', 'demo-hash')
ON CONFLICT (email) DO NOTHING;

INSERT INTO hackathons (name, theme, start_date) VALUES
  ('Smart Agri Hackathon', 'Technology for farmers', '2026-12-15'),
  ('HealthTech Challenge', 'Healthcare access', '2027-01-10'),
  ('Campus Hack', 'Student life', '2027-02-05')
ON CONFLICT (name) DO NOTHING;

INSERT INTO hackathon_interests (user_id, hackathon_id)
SELECT u.id, h.id FROM users u, hackathons h
WHERE (u.email = 'ravi@example.com'  AND h.name = 'Smart Agri Hackathon')
   OR (u.email = 'sai@example.com'   AND h.name = 'Smart Agri Hackathon')
   OR (u.email = 'priya@example.com' AND h.name = 'Smart Agri Hackathon')
   OR (u.email = 'kiran@example.com' AND h.name = 'HealthTech Challenge')
ON CONFLICT DO NOTHING;