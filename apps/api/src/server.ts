import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import authRouter from "@/auth/routes";

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

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Buildora API running on ${PORT}`);
});

export default app;
