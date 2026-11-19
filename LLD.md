# TeamFinder - LLD

## Server folder structure
```
server/
  .env.example
  src/
    app.js          creates the express app and adds middleware
    server.js       starts the server
    config/env.js   loads and checks the environment variables
    routes, controllers, services, middleware, utils, db   (will add later)
```

## Environment variables
| Name | Use | Example |
|---|---|---|
| PORT | port the server runs on | 5000 |
| DATABASE_URL | PostgreSQL connection (will add later) | postgres://user:password@host/dbname |

## Database tables (PostgreSQL, not created yet)

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
| name | TEXT | required |
| theme | TEXT | |
| start_date | DATE | |

hackathon_interests
| Column | Type | Notes |
|---|---|---|
| user_id | INT | foreign key to users.id |
| hackathon_id | INT | foreign key to hackathons.id |
| looking_for_team | BOOLEAN | default true |

The primary key is (user_id, hackathon_id), so one user can show interest in one hackathon only once.

Relationship: one user can be interested in many hackathons and one hackathon can have many users. It is a many-to-many relationship, and the hackathon_interests table connects them.

## API routes
All routes start with /api/v1

| Method | Path | What it does | Success | Errors |
|---|---|---|---|---|
| GET | /health | checks the server is running | 200 | |
| GET | /hackathons | list of hackathons | 200 | |
| GET | /hackathons/:id | one hackathon | 200 | 404 |
| POST | /hackathons/:id/interest | mark "looking for team" | 201 | 401, 404, 409 |
| DELETE | /hackathons/:id/interest | remove my interest | 204 | 401, 404 |
| GET | /hackathons/:id/seekers | who else is looking | 200 | 404 |

Right now only the health route is built. The rest are the next steps.

## Status codes I will use
| Code | Meaning here |
|---|---|
| 200 | worked |
| 201 | something new was created |
| 204 | deleted, nothing to send back |
| 400 | wrong input |
| 401 | not logged in |
| 404 | not found |
| 409 | duplicate, like adding the same interest twice |
| 500 | unexpected server error |

## Error format
```json
{ "error": { "message": "Hackathon not found", "status": 404 } }
```

## Seekers query (idea)
Join hackathon_interests with users on user_id, then filter by the hackathon id and looking_for_team = true.