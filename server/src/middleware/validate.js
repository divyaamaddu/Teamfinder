import AppError from "../utils/AppError.js";

export default function validate(schema) {
  return function (req, res, next) {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => {
          const field = issue.path.join(".");
          return field ? `${field}: ${issue.message}` : issue.message;
        })
        .join("; ");
      throw new AppError(message, 400);
    }

    req.body = result.data;
    next();
  };
}