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
    middleware/     requestLogger, auth, validateId, notFound, errorHandler
    utils/          AppError
    db/             schema.sql, seed.sql, setup.js
```

## Environment variables
| Name | Use | Example |
|---|---|---|
| PORT | port the server runs on | 5000 |
| DATABASE_URL | PostgreSQL connection string | postgresql://user:password@host/dbname?sslmode=require |

## Database tables (PostgreSQL)

users
| Column | Type | Notes |
|---|---|---|
| id | SERIAL | primary key |
| name | TEXT | required |
| email | TEXT | unique, required |
| password_hash | TEXT | required |

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

## API routes
All routes start with /api/v1

| Method | Path | What it does | Success | Errors |
|---|---|---|---|---|
| GET | /health | checks the server is running | 200 | |
| GET | /hackathons | list of hackathons | 200 | |
| GET | /hackathons/:id | one hackathon | 200 | 400, 404 |
| POST | /hackathons/:id/interest | mark "looking for team" | 201 | 400, 401, 404, 409 |
| DELETE | /hackathons/:id/interest | remove my interest | 204 | 400, 401, 404 |
| GET | /hackathons/:id/seekers | who else is looking | 200 | 400, 404 |

All the routes in this table are built and tested.

Note: the POST and DELETE routes use a temporary x-user-id header to find the user. This is not secure and will be replaced with JWT login.

## Status codes I use
| Code | Meaning here |
|---|---|
| 200 | worked |
| 201 | something new was created |
| 204 | deleted, nothing to send back |
| 400 | wrong input, like an id that is not a number |
| 401 | not logged in, or the user does not exist |
| 404 | not found |
| 409 | duplicate, like adding the same interest twice |
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
| validateId | checks that the id in the url is a positive whole number |
| auth | finds the user from the x-user-id header (temporary, will be replaced with JWT) |
| notFound | sends a 404 for routes that do not exist |
| errorHandler | sends every error in the same format |

## Seekers query
Join hackathon_interests with users on user_id, then filter by the hackathon id and looking_for_team = true.

## Date format
start_date is returned as plain text in YYYY-MM-DD format. Without this, the date moved back by one day because of the timezone.