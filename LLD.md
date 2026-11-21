# TeamFinder - LLD

## Server folder structure
```
server/
  .env.example
  src/
    app.js          creates the express app and adds middleware
    server.js       starts the server
    config/         env.js (loads and checks env variables), db.js (database connection)
    routes/         URL paths
    controllers/    read the request and send the response
    services/       the logic and the database queries
    middleware/     requestLogger, auth, validate, validateId, notFound, errorHandler
    validators/     zod schemas for request bodies
    utils/          AppError
    db/             schema.sql, seed.sql, setup.js
```

## Environment variables
| Name | Use | Example |
|---|---|---|
| PORT | port the server runs on | 5000 |
| DATABASE_URL | PostgreSQL connection string | postgresql://user:password@host/dbname?sslmode=require |
| JWT_SECRET | secret used to sign and check tokens | a long random string |
| JWT_EXPIRES_IN | how long a token lasts (optional, default 1d) | 1d |

## Database tables (PostgreSQL)

users
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | primary key |
| name | TEXT | required |
| email | TEXT | unique, required |
| password_hash | TEXT | required, bcrypt hash |

hackathons
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | primary key |
| name | TEXT | unique, required |
| theme | TEXT | |
| start_date | DATE | |

hackathon_interests
| Column | Type | Notes |
|---|---|---|
| user_id | INT | foreign key to users.id, deleted along with the user |
| hackathon_id | INT | foreign key to hackathons.id, deleted along with the hackathon |
| looking_for_team | BOOLEAN | default true |

The primary key is (user_id, hackathon_id), so one user can show interest in one hackathon only once.

Relationship: one user can be interested in many hackathons and one hackathon can have many users. It is a many-to-many relationship, and the hackathon_interests table connects them.

The four demo users in seed.sql have a placeholder password hash, so they cannot log in. Real users come from the register route.

## API routes
All routes start with /api/v1

| Method | Path | What it does | Login needed | Success | Errors |
|---|---|---|---|---|---|
| GET | /health | checks the server is running | No | 200 | |
| POST | /auth/register | create an account | No | 201 | 400, 409 |
| POST | /auth/login | log in and get a token | No | 200 | 400, 401 |
| GET | /auth/me | who am I | Yes | 200 | 401 |
| GET | /hackathons | list of hackathons | No | 200 | |
| GET | /hackathons/:id | one hackathon | No | 200 | 400, 404 |
| POST | /hackathons/:id/interest | mark "looking for team" | Yes | 201 | 400, 401, 404, 409 |
| DELETE | /hackathons/:id/interest | remove my interest | Yes | 204 | 400, 401, 404 |
| GET | /hackathons/:id/seekers | who else is looking | No | 200 | 400, 404 |

All the routes in this table are built and tested.

## Validation rules (zod)
| Field | Rule |
|---|---|
| name | 2 to 60 characters |
| email | a valid email, saved in lowercase |
| password | 8 to 72 characters (bcrypt only uses the first 72) |

## Status codes I use
| Code | Meaning here |
|---|---|
| 200 | worked |
| 201 | something new was created |
| 204 | deleted, nothing to send back |
| 400 | wrong input, like a bad id or a short password |
| 401 | not logged in, wrong password, or bad or expired token |
| 404 | not found |
| 409 | duplicate, like a repeated email or interest |
| 500 | unexpected server error |

## Error format
```json
{ "error": { "message": "Hackathon not found", "status": 404 } }
```
Errors are thrown as an AppError with a status code. One error handler at the end sends the reply. For a 500 error, the real details are only printed in the terminal and the client gets a general message.

## Middleware
| Name | What it does |
|---|---|
| requestLogger | prints the method, url, status code and time for each request |
| validate(schema) | checks the request body against a zod schema, sends 400 if it fails |
| validateId | checks that the id in the url is a positive whole number |
| auth | reads the Bearer token, checks its signature, and loads the user |
| notFound | sends a 404 for routes that do not exist |
| errorHandler | sends every error in the same format |

## Login flow (services/auth.service.js)
- Register: hash the password with bcrypt (10 rounds), insert the user, and return 409 if the email already exists.
- Login: find the user by email, compare the password with the hash, and return a token signed with JWT_SECRET. Wrong email and wrong password give the same 401 message.
- The token holds the user id (sub) and an expiry time.

## Seekers query
Join hackathon_interests with users on user_id, then filter by the hackathon id and looking_for_team = true.

## Date format
start_date is returned as plain text in YYYY-MM-DD format. Without this, the date moved back by one day because of the timezone.