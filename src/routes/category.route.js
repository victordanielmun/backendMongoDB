import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  listCategorys,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCategorySchema } from "../schemas/category.schema.js";

const router = Router();

router.get("/listCategorys", authRequired, listCategorys);
router.get("/getCategoryById/:id", authRequired, getCategoryById);
router.post("/categorysCreate", authRequired, validateSchema(createCategorySchema), createCategory);
router.delete("/deleteCategory/:id", authRequired, deleteCategory);
router.put("/updateCategory/:id", authRequired, updateCategory);

export default router;