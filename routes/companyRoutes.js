const express = require("express");
const db = require("../utils/database");

const router = express.Router();

// Get all companies
router.get("/", async (req, res) => {
    try {
        const [companies] = await db.promise().query(
            `SELECT id, name, logo, description, website, created_at
             FROM companies
             ORDER BY name ASC`
        );

        res.json({
            success: true,
            companies
        });

    } catch (error) {
        console.error("Company error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load companies."
        });
    }
});

// Add company
router.post("/", async (req, res) => {
    try {
        const { name, logo, description, website } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Company name is required."
            });
        }

        const [result] = await db.promise().query(
            `INSERT INTO companies
             (name, logo, description, website)
             VALUES (?, ?, ?, ?)`,
            [
                name,
                logo || null,
                description || null,
                website || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Company added successfully.",
            companyId: result.insertId
        });

    } catch (error) {
        console.error("Add company error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to add company."
        });
    }
});

module.exports = router;