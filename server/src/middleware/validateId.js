import AppError from "../utils/AppError.js";

export default function validateId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("id must be a positive whole number", 400);
  }

  req.hackathonId = id;
  next();
}