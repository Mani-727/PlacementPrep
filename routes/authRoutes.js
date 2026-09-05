const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../utils/database");

const router = express.Router();

// Student Registration
router.post("/register", async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            college,
            branch,
            year
        } = req.body;

        // Check required fields
        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            });
        }

        // Check whether email already exists
        const [existingStudents] = await db.promise().query(
            "SELECT id FROM students WHERE email = ?",
            [email]
        );

        if (existingStudents.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert student
        const [result] = await db.promise().query(
            `INSERT INTO students
            (full_name, email, password, college, branch, year)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                full_name,
                email,
                hashedPassword,
                college || null,
                branch || null,
                year || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            studentId: result.insertId
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during registration."
        });
    }
});

router.get("/session", (req, res) => {
    if (!req.session.studentId) {
        return res.json({
            success: false
        });
    }

    res.json({
        success: true,
        student: {
            id: req.session.studentId,
            name: req.session.studentName
        }
    });
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed"
            });
        }

        res.json({
            success: true,
            message: "Login successful!",
            student: {
                id: student.id,
                name: student.full_name,
                email: student.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server error during login."
        });
    }
});

module.exports = router;