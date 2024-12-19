const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

// Database connection with direct credentials (not recommended for production)
const db = mysql.createPool({
    host: "bnzv1gcpy44mbyzhobd8-mysql.services.clever-cloud.com",
    user: "ul44cavoshszkrxi",
    password: "jI5ySHaitE8k904ziZ3E",
    database: "bnzv1gcpy44mbyzhobd8",
});

// Default route to fetch all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ message: "Error fetching data", error: err.sqlMessage });
        }
        return res.json(data);
    });
});

// Create a new student
app.post("/create", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Bad request: 'name' and 'email' are required" });
    }

    const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)";
    const values = [name, email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ message: "Error inserting data", error: err.sqlMessage });
        }
        console.log("Data inserted successfully:", result);
        return res.json({ message: "Student created successfully", result });
    });
});

// Update a student's details
app.put('/update/:id', (req, res) => {
    const { name, email } = req.body;
    const id = req.params.id;

    if (!name || !email) {
        return res.status(400).json({ message: "Bad request: 'name' and 'email' are required" });
    }

    const sql = "UPDATE student SET `Name`=?, `Email`=? WHERE `ID`=?";
    const values = [name, email];

    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ message: "Error updating data", error: err.sqlMessage });
        }
        return res.json({ message: "Student updated successfully", result });
    });
});

// Delete a student
app.delete('/student/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM student WHERE `ID`=?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error deleting data:", err);
            return res.status(500).json({ message: "Error deleting data", error: err.sqlMessage });
        }
        return res.json({ message: "Student deleted successfully", data });
    });
});

// Start server
app.listen(3030, () => {
    console.log("Server is listening on port 3030");
});
