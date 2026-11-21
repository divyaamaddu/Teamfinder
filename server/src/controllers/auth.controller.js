import * as service from "../services/auth.service.js";

export async function register(req, res) {
  const user = await service.registerUser(req.body);
  res.status(201).json({ user });
}

export async function login(req, res) {
  const result = await service.loginUser(req.body);
  res.status(200).json(result);
}

export async function me(req, res) {
  res.status(200).json({ user: req.user });
}