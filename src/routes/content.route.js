import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  listContents,
  getUserContents,
  getContentById,
  createContent,
  deleteContent,
  updateContent,
} from "../controllers/content.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createContentSchema } from "../schemas/content.schema.js";

const router = Router();

router.get("/listContents", authRequired, listContents);
router.get("/getUserContents/", authRequired, getUserContents);
router.get("/getContentById/:id", authRequired, getContentById);
router.post("/createContent", authRequired, validateSchema(createContentSchema), createContent);
router.delete("/deleteContent/:id", authRequired, deleteContent);
router.put("/updateContent/:id", authRequired, updateContent);

export default router;
