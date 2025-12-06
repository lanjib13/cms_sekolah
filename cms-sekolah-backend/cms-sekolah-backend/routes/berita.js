import express from "express";
import { 
  getAllBerita, 
  createBerita, 
  updateBerita, 
  deleteBerita 
} from "../../src/controllers/beritaController.js";

const router = express.Router();

router.get("/", getAllBerita);
router.post("/", createBerita);
router.put("/:id", updateBerita);
router.delete("/:id", deleteBerita);

export default router;
