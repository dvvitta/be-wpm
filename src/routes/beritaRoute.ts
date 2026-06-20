import { Router } from "express";
import { BeritaController } from "../controller/beritaController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// Public Routes
router.get("/", BeritaController.getAll);
router.get("/:slug", BeritaController.getBySlug);

// Protected Routes (Harus Login)
router.post("/", authenticate, BeritaController.create);
router.put("/:id", authenticate, BeritaController.update);
router.delete("/:id", authenticate, BeritaController.delete);

export default router;
