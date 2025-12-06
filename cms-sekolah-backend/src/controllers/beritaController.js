import db from "../config/db.js";


export const createBerita = (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    const query = "INSERT INTO berita (title, content, image) VALUES (?, ?, ?)";
    db.query(query, [title, content, image], (err) => {
        if (err) return res.status(500).json({ message: "Gagal menambah berita" });
        res.json({ message: "Berita berhasil ditambahkan" });
    });
};


export const getBerita = (req, res) => {
    const query = "SELECT * FROM berita ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: "Gagal mengambil berita" });
        res.json(results);
    });
};


export const getBeritaById = (req, res) => {
    const id = req.params.id;

    const query = "SELECT * FROM berita WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (results.length === 0) {
            return res.status(404).json({ message: "Berita tidak ditemukan" });
        }
        res.json(results[0]);
    });
};


export const updateBerita = (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    const image = req.file ? req.file.filename : null;

    let query, data;

    if (image) {
        query = "UPDATE berita SET title = ?, content = ?, image = ? WHERE id = ?";
        data = [title, content, image, id];
    } else {
        query = "UPDATE berita SET title = ?, content = ? WHERE id = ?";
        data = [title, content, id];
    }

    db.query(query, data, (err) => {
        if (err) return res.status(500).json({ message: "Gagal update berita" });
        res.json({ message: "Berita berhasil diupdate" });
    });
};


export const deleteBerita = (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM berita WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ message: "Gagal menghapus berita" });
        res.json({ message: "Berita berhasil dihapus" });
    });
};
