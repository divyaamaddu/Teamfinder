# TeamFinder: Product Requirements (PRD)

## 1. Problem
Students usually form hackathon teams with friends they already know. These teams often have the same skills, and no one has experience with the hackathon's theme. Existing teammate finders list individual profiles and leave the student to read and compare them.

## 2. Users
- **Student seeking a team:** wants to join a hackathon and find teammates whose skills complement theirs.
- **Student already in a team:** wants to find a missing skill.

## 3. Goal
Help a student pick a hackathon, see who else is looking for a team, and get a ranked list of the people who would complement them best, with evidence from their resumes.

## 4. Core user flow
1. The student registers and logs in.
2. The student uploads a resume (planned).
3. The student picks a hackathon and marks "looking for a team".
4. The student sees who else is looking for a team in that hackathon.
5. The app reads each resume against the hackathon theme and ranks candidates (planned).
6. The student sends a team request, and the other student accepts or rejects it (planned).

## 5. Main entities
- **User:** a student with a name, an email and a password.
- **Hackathon:** an event with a name, theme and start date.
- **Interest:** a link saying a user is looking for a team in a given hackathon.
- **Resume, Skill, Team, Request:** planned.

## 6. Feature status
| Feature | Status |
|---|---|
| Health check endpoint | Built |
| Environment configuration | Built |
| Users, hackathons, interests (database and API) | Planned (next) |
| Seekers list for a hackathon | Planned (next) |
| Login with JWT | Planned |
| Resume parsing with an LLM | Planned |
| Ranked matches with evidence | Planned |
| Team requests | Planned |

## 7. Out of scope (for now)
Payments, mobile app, video calls, and private or scanned-image resumes.

## 8. Success measures
- A student can find teammates for a hackathon in under 2 minutes.
- Every match shows evidence from the resume.