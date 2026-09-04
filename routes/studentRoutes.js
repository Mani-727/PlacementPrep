const express = require("express");
const db = require("../utils/database");

const router = express.Router();


// =====================================================
// ADMIN - GET ALL STUDENTS
// =====================================================

router.get("/students", async (req, res) => {

    try {

        const [students] = await db.promise().query(
            `SELECT id, full_name, email, mobile, college, branch, year,
                    semester, cgpa, created_at
             FROM students
             ORDER BY id DESC`
        );

        res.json({
            success: true,
            students
        });

    } catch (error) {

        console.error("Students error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load students."
        });

    }

});


// =====================================================
// GET LOGGED-IN STUDENT PROFILE
// =====================================================

router.get("/profile", async (req, res) => {

    try {

        // Check login session
        if (!req.session.studentId) {

            return res.status(401).json({
                success: false,
                message: "Please login first."
            });

        }


        const [students] = await db.promise().query(

            `SELECT
                id,
                full_name,
                email,
                mobile,
                profile_pic,
                date_of_birth,
                gender,
                college,
                branch,
                year,
                semester,
                cgpa,
                diploma,
                graduation_year,
                career_goal,
                preferred_language,
                skills,
                github,
                linkedin,
                portfolio,
                location,
                bio,
                created_at
             FROM students
             WHERE id = ?`,

            [req.session.studentId]

        );


        if (students.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Student profile not found."
            });

        }


        res.json({
            success: true,
            student: students[0]
        });


    } catch (error) {

        console.error("Profile error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load profile."
        });

    }

});


// =====================================================
// UPDATE LOGGED-IN STUDENT PROFILE
// =====================================================

router.put("/profile", async (req, res) => {

    try {

        // Check login session
        if (!req.session.studentId) {

            return res.status(401).json({
                success: false,
                message: "Please login first."
            });

        }


        const {
            full_name,
            mobile,
            date_of_birth,
            gender,
            college,
            branch,
            year,
            semester,
            cgpa,
            diploma,
            graduation_year,
            career_goal,
            preferred_language,
            skills,
            github,
            linkedin,
            portfolio,
            location,
            bio
        } = req.body;


        // Full name is required
        if (!full_name || !full_name.trim()) {

            return res.status(400).json({
                success: false,
                message: "Full name is required."
            });

        }


        await db.promise().query(

            `UPDATE students
             SET
                full_name = ?,
                mobile = ?,
                date_of_birth = ?,
                gender = ?,
                college = ?,
                branch = ?,
                year = ?,
                semester = ?,
                cgpa = ?,
                diploma = ?,
                graduation_year = ?,
                career_goal = ?,
                preferred_language = ?,
                skills = ?,
                github = ?,
                linkedin = ?,
                portfolio = ?,
                location = ?,
                bio = ?
             WHERE id = ?`,

            [
                full_name.trim(),
                mobile || null,
                date_of_birth || null,
                gender || null,
                college || null,
                branch || null,
                year || null,
                semester || null,
                cgpa || null,
                diploma || null,
                graduation_year || null,
                career_goal || null,
                preferred_language || null,
                skills || null,
                github || null,
                linkedin || null,
                portfolio || null,
                location || null,
                bio || null,
                req.session.studentId
            ]

        );


        // Update session name also
        req.session.studentName =
            full_name.trim();


        res.json({

            success: true,

            message: "Profile updated successfully."

        });


    } catch (error) {

        console.error("Profile update error:", error);

        res.status(500).json({

            success: false,

            message: "Unable to update profile."

        });

    }

});


module.exports = router;