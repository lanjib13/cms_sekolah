import express from "express";
import {
    createGallery,
    getGallery,
    updateGallery,
    deleteGallery,
} from "../controllers/galleryController.js";
import uploadGallery from "../middleware/uploadGallery.js";

const router = express.Router();

router.post("/", uploadGallery.single("image"), createGallery);
router.get("/", getGallery);
router.put("/:id", uploadGallery.single("image"), updateGallery);
router.delete("/:id", deleteGallery);

export default router;
