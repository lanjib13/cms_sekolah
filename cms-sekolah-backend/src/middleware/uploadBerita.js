import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/berita");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowed = [".jpg", ".jpeg", ".png"];

    if (!allowed.includes(ext)) {
        return cb(new Error("Hanya boleh upload file gambar"), false);
    }

    cb(null, true);
};

const uploadBerita = multer({ storage, fileFilter });

export default uploadBerita;
