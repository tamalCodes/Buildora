import authRouter from "@/auth/routes";
import healthRouter from "@/health/routes";
import profileRouter from "@/profile/routes";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";

const PORT = process.env.PORT || 3001;
const WEB_ORIGIN = process.env.WEB_ORIGIN || "http://localhost:3000";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: WEB_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "Buildora API",
    status: "ok",
    health: "/health",
    healthPing: "/health/ping",
    auth: "/api/auth",
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/health", healthRouter);

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Buildora API running on ${PORT}`);
});

export default app;
