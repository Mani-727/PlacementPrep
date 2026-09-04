const express = require("express");
const db = require("../utils/database");

const router = express.Router();

/* =========================================
   GET QUESTIONS FOR A SPECIFIC TEST
   /api/tests/questions?testId=1
   ========================================= */

router.get("/questions", async (req, res) => {
    try {

        const testId = Number(req.query.testId);

        if (!testId) {
            return res.status(400).json({
                success: false,
                message: "testId is required."
            });
        }

        const [questions] = await db.promise().query(
            `
            SELECT
                q.id,
                q.subject_id,
                q.question,
                q.option_a,
                q.option_b,
                q.option_c,
                q.option_d,
                q.correct_answer,
                q.explanation,
                q.difficulty
            FROM test_questions tq
            INNER JOIN questions q
                ON tq.question_id = q.id
            WHERE tq.test_id = ?
            ORDER BY tq.id ASC
            `,
            [testId]
        );

        res.json({
            success: true,
            testId: testId,
            questions: questions
        });

    } catch (error) {

        console.error("Questions loading error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load questions."
        });
    }
});


/* =========================================
   ADD QUESTION
   ========================================= */

router.post("/questions", async (req, res) => {
    try {

        const {
            subject_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            explanation,
            difficulty
        } = req.body;

        if (
            !subject_id ||
            !question ||
            !option_a ||
            !option_b ||
            !option_c ||
            !option_d ||
            !correct_answer
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const [result] = await db.promise().query(
            `
            INSERT INTO questions
            (
                subject_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer,
                explanation,
                difficulty
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                subject_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_answer,
                explanation || null,
                difficulty || "Easy"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Question added successfully.",
            questionId: result.insertId
        });

    } catch (error) {

        console.error("Add question error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to add question."
        });
    }
});


/* =========================================
   SAVE TEST ATTEMPT
   ========================================= */

router.post("/attempts", async (req, res) => {
    try {

        const studentId = req.session.studentId;

        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Student is not logged in."
            });
        }

        const {
            test_id,
            score,
            total_marks,
            started_at,
            completed_at
        } = req.body;

        if (
            !test_id ||
            score === undefined ||
            !total_marks
        ) {
            return res.status(400).json({
                success: false,
                message: "Test details are required."
            });
        }

        const [result] = await db.promise().query(
            `
            INSERT INTO test_attempts
            (
                student_id,
                test_id,
                score,
                total_marks,
                started_at,
                completed_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                studentId,
                test_id,
                score,
                total_marks,
                started_at || new Date(),
                completed_at || new Date()
            ]
        );

        res.status(201).json({
            success: true,
            message: "Test attempt saved successfully.",
            attemptId: result.insertId
        });

    } catch (error) {

        console.error("Attempt error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to save test attempt."
        });
    }
});

/* =========================================
   GET LATEST TEST RESULT
   ========================================= */

router.get("/my-result", async (req, res) => {
    try {

        const studentId = req.session.studentId;

        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Student is not logged in."
            });
        }

        const [attempts] = await db.promise().query(
            `
            SELECT
                ta.id,
                ta.test_id,
                ta.score,
                ta.total_marks,
                ta.started_at,
                ta.completed_at,
                t.title
            FROM test_attempts ta
            LEFT JOIN tests t
                ON ta.test_id = t.id
            WHERE ta.student_id = ?
            ORDER BY ta.id DESC
            LIMIT 1
            `,
            [studentId]
        );

        if (attempts.length === 0) {
            return res.json({
                success: false,
                message: "No test attempts found."
            });
        }

        res.json({
            success: true,
            result: attempts[0]
        });

    } catch (error) {

        console.error("Result error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load result."
        });
    }
});


/* =========================================
   GET STUDENT PROGRESS
   ========================================= */

router.get("/progress", async (req, res) => {
    try {

        const studentId = req.session.studentId;

        if (!studentId) {
            return res.status(401).json({
                success: false,
                message: "Student is not logged in."
            });
        }

        const [data] = await db.promise().query(
            `
            SELECT
                COUNT(*) AS tests_completed,
                COALESCE(SUM(score), 0) AS total_score,
                COALESCE(SUM(total_marks), 0) AS total_marks
            FROM test_attempts
            WHERE student_id = ?
            `,
            [studentId]
        );

        const stats = data[0];

        let readiness = 0;

        if (Number(stats.total_marks) > 0) {
            readiness = Math.round(
                (Number(stats.total_score) /
                Number(stats.total_marks)) * 100
            );
        }

        res.json({
            success: true,
            progress: {
                tests_completed: Number(stats.tests_completed),
                total_score: Number(stats.total_score),
                total_marks: Number(stats.total_marks),
                readiness: readiness
            }
        });

    } catch (error) {

        console.error("Progress error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load progress."
        });
    }
});


module.exports = router;