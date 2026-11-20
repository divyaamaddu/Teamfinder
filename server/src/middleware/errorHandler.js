export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    error: {
      message: status === 500 ? "Something went wrong on the server" : err.message,
      status,
    },
  });
}