# TeamFinder - PRD

## What problem I'm solving
When students join hackathons they mostly make teams with their friends. Most of the time everyone in the team has the same skills, like all of them know React but nobody knows backend. Also nobody in the team has worked on something related to the hackathon theme.

The teammate finder apps that already exist just show a list of profiles. The student has to open every profile and read it, which takes a lot of time.

## Who will use it
- A student who wants to join a hackathon and needs teammates.
- A student who already has a team but is missing one skill.

## What I want to build
A student picks a hackathon and says "I'm looking for a team". They can then see who else is looking for a team in the same hackathon. Later the app will read their resumes and show who would be the best match, with proof from the resume.

## How it works (the flow)
1. Student registers and logs in.
2. Student uploads a resume (not built yet).
3. Student picks a hackathon and clicks "looking for a team".
4. Student sees the other students who are also looking.
5. The app reads the resumes and ranks the people (not built yet).
6. Student sends a team request and the other person accepts or rejects (not built yet).

## Main things in the system
- User: a student, with name, email and password (stored as a hash).
- Hackathon: name, theme and start date.
- Interest: says that a user is looking for a team in a hackathon.
- Resume, Skill, Team and Request: I will add these later.

## What is done and what is not
| Feature | Status |
|---|---|
| Health check route | Done |
| Environment variable setup | Done |
| Users, hackathons and interests tables | Done |
| List hackathons and see one hackathon | Done |
| Mark and remove "looking for a team" | Done |
| Seekers list for a hackathon | Done |
| Register and login with password hashing and JWT | Done |
| React frontend | Next |
| Resume reading using LLM | Later |
| Ranked matches | Later |
| Team requests | Later |

## What I am not building right now
Payments, mobile app, video calls, and scanned (image) resumes.

## How I will know it works
- A student can find teammates for a hackathon in a couple of minutes.
- Every match shows a line from the resume as proof.