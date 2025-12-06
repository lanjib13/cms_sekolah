import db from "../config/db.js";


export const createGallery = (req, res) => {
    const { title } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = "INSERT INTO gallery (title, image) VALUES (?, ?)";
    db.query(query, [title, image], (err) => {
        if (err) {
            console.log("🔥 MYSQL ERROR:", err); 
            return res.status(500).json({
                message: "Gagal menambah data",
                error: err
            });
        }
        res.json({ message: "Gallery berhasil ditambahkan" });
    });
};


export const getGallery = (req, res) => {
    const query = "SELECT * FROM gallery ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil data" });
        res.json(results);
    });
};


export const updateGallery = (req, res) => {
    const { title } = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : null;

    let query;
    let data;

    if (image) {
        query = "UPDATE gallery SET title = ?, image = ? WHERE id = ?";
        data = [title, image, id];
    } else {
        query = "UPDATE gallery SET title = ? WHERE id = ?";
        data = [title, id];
    }

    db.query(query, data, (err) => {
        if (err) return res.status(500).json({ message: "Gagal update data" });
        res.json({ message: "Gallery berhasil diupdate" });
    });
};


export const deleteGallery = (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM gallery WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ message: "Gagal menghapus data" });
        res.json({ message: "Gallery berhasil dihapus" });
    });
};
