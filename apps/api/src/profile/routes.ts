import { Router } from "express";
import { getProfile, updateProfile } from "@/profile/controllers/profile.core.controller";
import { getProfileSummary } from "@/profile/controllers/profile.summary.controller";
import {
  createEducation,
  deleteEducation,
  getEducations,
  updateEducation,
} from "@/profile/controllers/profile.education.controller";

const router = Router();

router.get("/me/summary", getProfileSummary);
router.get("/me", getProfile);
router.patch("/me", updateProfile);
router.get("/me/educations", getEducations);
router.post("/me/educations", createEducation);
router.patch("/me/educations/:id", updateEducation);
router.delete("/me/educations/:id", deleteEducation);

export default router;
