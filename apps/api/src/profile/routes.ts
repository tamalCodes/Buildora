import { Router } from "express";
import { getProfile, updateProfile } from "@/profile/controllers/profile.core.controller";
import { getProfileSummary } from "@/profile/controllers/profile.summary.controller";
import {
  createEducation,
  deleteEducation,
  getEducations,
  updateEducation,
} from "@/profile/controllers/profile.education.controller";
import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "@/profile/controllers/profile.experience.controller";
import {
  createLink,
  deleteLink,
  getLinks,
  updateLink,
} from "@/profile/controllers/profile.links.controller";
import {
  getRoles,
  replaceRoles,
} from "@/profile/controllers/profile.roles.controller";
import {
  getSkills,
  replaceSkills,
} from "@/profile/controllers/profile.skills.controller";
import {
  deleteResume,
  getResume,
  upsertResume,
} from "@/profile/controllers/profile.resume.controller";

const router = Router();

router.get("/me/summary", getProfileSummary);
router.get("/me", getProfile);
router.patch("/me", updateProfile);
router.get("/me/educations", getEducations);
router.post("/me/educations", createEducation);
router.patch("/me/educations/:id", updateEducation);
router.delete("/me/educations/:id", deleteEducation);
router.get("/me/experiences", getExperiences);
router.post("/me/experiences", createExperience);
router.patch("/me/experiences/:id", updateExperience);
router.delete("/me/experiences/:id", deleteExperience);
router.get("/me/links", getLinks);
router.post("/me/links", createLink);
router.patch("/me/links/:id", updateLink);
router.delete("/me/links/:id", deleteLink);
router.get("/me/roles", getRoles);
router.put("/me/roles", replaceRoles);
router.get("/me/skills", getSkills);
router.put("/me/skills", replaceSkills);
router.get("/me/resume", getResume);
router.put("/me/resume", upsertResume);
router.delete("/me/resume", deleteResume);

export default router;
