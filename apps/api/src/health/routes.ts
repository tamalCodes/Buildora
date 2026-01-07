import { Router } from "express";
import { pingSupabase } from "@/health/controllers";

const router = Router();

router.get("/ping", pingSupabase);

export default router;
