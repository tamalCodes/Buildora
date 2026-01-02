import {
  getProfile,
  updateProfile,
} from "@/profile/controllers/profile.core.controller";
import {
  createEducation,
  deleteEducation,
  listEducations,
  updateEducation,
} from "@/profile/controllers/profile.education.controller";
import {
  createExperience,
  deleteExperience,
  listExperiences,
  updateExperience,
} from "@/profile/controllers/profile.experience.controller";
import {
  createLink,
  deleteLink,
  listLinks,
  updateLink,
} from "@/profile/controllers/profile.links.controller";
import {
  deleteResume,
  getResume,
  upsertResume,
} from "@/profile/controllers/profile.resume.controller";
import {
  listRoles,
  replaceRoles,
} from "@/profile/controllers/profile.roles.controller";
import {
  listSkills,
  replaceSkills,
} from "@/profile/controllers/profile.skills.controller";
import { getProfileSummary } from "@/profile/controllers/profile.summary.controller";
import { Router } from "express";

const router = Router();

router.get("/me/summary", getProfileSummary);
router.get("/me", getProfile);
router.patch("/me", updateProfile);
router.get("/me/educations", listEducations);
router.post("/me/educations", createEducation);
router.patch("/me/educations/:id", updateEducation);
router.delete("/me/educations/:id", deleteEducation);
router.get("/me/experiences", listExperiences);
router.post("/me/experiences", createExperience);
router.patch("/me/experiences/:id", updateExperience);
router.delete("/me/experiences/:id", deleteExperience);
router.get("/me/links", listLinks);
router.post("/me/links", createLink);
router.patch("/me/links/:id", updateLink);
router.delete("/me/links/:id", deleteLink);
router.get("/me/roles", listRoles);
router.put("/me/roles", replaceRoles);
router.get("/me/skills", listSkills);
router.put("/me/skills", replaceSkills);
router.get("/me/resume", getResume);
router.put("/me/resume", upsertResume);
router.delete("/me/resume", deleteResume);

export default router;
