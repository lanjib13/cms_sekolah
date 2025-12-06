import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const { name, email, password } = req.body;

    const checkUser = "SELECT * FROM users WHERE email = ?";
    db.query(checkUser, [email], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUser = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(insertUser, [name, email, hashedPassword], (err) => {
            if (err) return res.status(500).json({ message: "Server error" });
            return res.status(201).json({ message: "Registrasi berhasil" });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (results.length === 0) {
            return res.status(404).json({ message: "Email tidak ditemukan" });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Password salah" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
};
