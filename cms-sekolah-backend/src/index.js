// import dotenv from "dotenv";
// dotenv.config();

import "dotenv/config";
import express from "express";
import cors from "cors";


import authRoutes from "./routes/auth.js";
import galleryRoutes from "./routes/gallery.js";
import beritaRoutes from "./routes/berita.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/gallery", galleryRoutes);
app.use("/berita", beritaRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});
