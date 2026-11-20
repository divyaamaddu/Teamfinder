import express from "express";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import hackathonRoutes from "./routes/hackathons.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1/hackathons", hackathonRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;