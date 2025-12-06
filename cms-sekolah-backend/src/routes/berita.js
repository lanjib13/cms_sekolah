import express from "express";
import {
    createBerita,
    getBerita,
    getBeritaById,
    updateBerita,
    deleteBerita
} from "../controllers/beritaController.js";

import uploadBerita from "../middleware/uploadBerita.js";

const router = express.Router();

router.post("/", uploadBerita.single("image"), createBerita);
router.get("/", getBerita);
router.get("/:id", getBeritaById);
router.put("/:id", uploadBerita.single("image"), updateBerita);
router.delete("/:id", deleteBerita);

export default router;
