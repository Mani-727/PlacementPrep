const express = require("express");
const db = require("../utils/database");

const router = express.Router();

// Get all interview questions
router.get("/", async (req, res) => {
    try {
        const [questions] = await db.promise().query(
            `SELECT id, category, question, answer, difficulty, created_at
             FROM interview_questions
             ORDER BY id DESC`
        );

        res.json({
            success: true,
            questions
        });

    } catch (error) {
        console.error("Interview questions error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load interview questions."
        });
    }
});

// Add interview question
router.post("/", async (req, res) => {
    try {
        const {
            category,
            question,
            answer,
            difficulty
        } = req.body;

        if (!category || !question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Category, question and answer are required."
            });
        }

        const [result] = await db.promise().query(
            `INSERT INTO interview_questions
             (category, question, answer, difficulty)
             VALUES (?, ?, ?, ?)`,
            [
                category,
                question,
                answer,
                difficulty || "Easy"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Interview question added successfully.",
            questionId: result.insertId
        });

    } catch (error) {
        console.error("Add interview question error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to add interview question."
        });
    }
});

module.exports = router;