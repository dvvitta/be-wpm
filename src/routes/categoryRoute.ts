import { Router } from "express";
import { KategoriController } from "../controller/categoryController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", KategoriController.getAll);
router.get("/:id", KategoriController.getById);

router.post("/", authenticate, KategoriController.create);
router.put("/:id", authenticate, KategoriController.update);
router.delete("/:id", authenticate, KategoriController.delete);

export default router;
