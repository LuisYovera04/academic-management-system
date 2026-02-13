const db = require('../database/db-config');
const { validationResult } = require('express-validator');

// --- Helper function to handle SQL errors ---
const handleSQLError = (res, err) => {
  console.error('Database Error:', err.message);
  return res.status(500).json({ error: 'Internal Server Error' });
};

const StudentController = {

  // 1. GET /api/students (With Pagination & Filters)
  getAllStudents: (req, res) => {
    // Extract query parameters
    const { page = 1, limit = 10, major, semester, is_active } = req.query;
    const offset = (page - 1) * limit;

    // Build dynamic SQL query based on filters
    let sql = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (major) {
      sql += ' AND major = ?';
      params.push(major);
    }
    if (semester) {
      sql += ' AND semester = ?';
      params.push(semester);
    }
    // Handle boolean filter for is_active
    if (is_active !== undefined) {
      sql += ' AND is_active = ?';
      params.push(is_active === 'true' ? 1 : 0);
    }

    // Add pagination to the query
    const sqlWithLimit = `${sql} LIMIT ? OFFSET ?`;
    const paramsWithLimit = [...params, limit, offset];

    // First query: Get the data
    db.all(sqlWithLimit, paramsWithLimit, (err, rows) => {
      if (err) return handleSQLError(res, err);

      // Second query: Get total count (for pagination metadata)
      const countSql = `SELECT count(*) as total FROM students WHERE ${sql.split('WHERE')[1]}`;
      
      db.get(countSql, params, (err, countResult) => {
        if (err) return handleSQLError(res, err);

        res.json({
          data: rows,
          meta: {
            total: countResult.total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(countResult.total / limit)
          }
        });
      });
    });
  },

  // 2. GET /api/students/:id
  getStudentById: (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM students WHERE id = ?';

    db.get(sql, [id], (err, row) => {
      if (err) return handleSQLError(res, err);
      
      if (!row) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(row);
    });
  },

  // 3. POST /api/students
  createStudent: (req, res) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, major, semester, gpa, enrollment_date, phone_number } = req.body;
    
    const sql = `
      INSERT INTO students (first_name, last_name, email, major, semester, gpa, enrollment_date, phone_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [first_name, last_name, email, major, semester, gpa, enrollment_date, phone_number];

    db.run(sql, params, function(err) {
      if (err) {
        // Handle unique email constraint
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return handleSQLError(res, err);
      }
      
      // Respond with the created ID (201 Created)
      res.status(201).json({ 
        id: this.lastID, 
        ...req.body,
        is_active: 1 // Default value
      });
    });
  },

  // 4. PUT/PATCH /api/students/:id (Update)
  updateStudent: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;
    
    // Dynamically build the SET clause to allow partial updates (PATCH) or full updates (PUT)
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const sql = `UPDATE students SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [...values, id];

    db.run(sql, params, function(err) {
      if (err) return handleSQLError(res, err);

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.json({ message: 'Student updated successfully', changes: this.changes });
    });
  },

  // 5. DELETE /api/students/:id (Soft Delete)
  deleteStudent: (req, res) => {
    const { id } = req.params;
    
    // Requirement: Soft delete (mark as inactive), do NOT remove from DB
    const sql = 'UPDATE students SET is_active = 0 WHERE id = ?';

    db.run(sql, [id], function(err) {
      if (err) return handleSQLError(res, err);

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.status(200).json({ message: 'Student deactivated successfully' });
    });
  },

  // 6. GET /api/statistics - CORREGIDO
  getStatistics: (req, res) => {
    const generalSql = `
      SELECT 
        COUNT(*) as total_students, 
        AVG(gpa) as average_gpa 
      FROM students 
      WHERE is_active = 1
    `;

    const majorSql = `
      SELECT major, COUNT(*) as count 
      FROM students 
      WHERE is_active = 1 
      GROUP BY major
    `;

    const semesterSql = `
      SELECT semester, COUNT(*) as count 
      FROM students 
      WHERE is_active = 1 
      GROUP BY semester
    `;

    db.get(generalSql, [], (err, generalStats) => {
      if (err) return handleSQLError(res, err);

      db.all(majorSql, [], (err, majorStats) => {
        if (err) return handleSQLError(res, err);

        db.all(semesterSql, [], (err, semesterStats) => {
          if (err) return handleSQLError(res, err);

          // PROCESAMIENTO: Convertimos los arreglos en objetos planos para el Frontend
          const distMajor = {};
          majorStats.forEach(item => { distMajor[item.major] = item.count; });

          const distSemester = {};
          semesterStats.forEach(item => { distSemester[item.semester] = item.count; });

          // RESPUESTA: Enviamos números puros y nombres de campos correctos
          res.json({
            success: true,
            data: {
              total_students: generalStats.total_students || 0,
              // Enviamos como número puro (sin toFixed) para que el Frontend lo maneje
              average_gpa: generalStats.average_gpa || 0, 
              distribution_by_major: distMajor,
              distribution_by_semester: distSemester
            }
          });
        });
      });
    });
  }
};

module.exports = StudentController;