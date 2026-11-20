import * as service from "../services/hackathons.service.js";

export async function getAll(req, res) {
  res.status(200).json(await service.listHackathons());
}

export async function getOne(req, res) {
  res.status(200).json(await service.getHackathon(req.hackathonId));
}

export async function addInterest(req, res) {
  const interest = await service.addInterest(req.user.id, req.hackathonId);
  res.status(201).json(interest);
}

export async function removeInterest(req, res) {
  await service.removeInterest(req.user.id, req.hackathonId);
  res.status(204).send();
}

export async function getSeekers(req, res) {
  res.status(200).json(await service.listSeekers(req.hackathonId));
}