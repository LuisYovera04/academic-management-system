// Added by AlbertoSc16: Definition of endpoints
// Modified to match Controller logic and Requirements

const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Verify the filename matches exactly: student-controller.js (kebab-case)
const studentController = require("../controllers/student-controller");

const {
  createStudentValidators,
  updateStudentValidators,
  patchStudentValidators,
  listStudentsValidators,
  idOnlyValidators,
} = require("../utils/validators");

// --- Middleware: centralized handling of validation errors ---
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation error in the data sent.",
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};

// --- Student routes ---

/**
 * GET /api/students/statistics
 * REQUIRED BY PROFESSOR (Image 3)
 * Retrieves general stats, GPA avg, and counts.
 * IMPORTANT: This must be defined BEFORE /:id to avoid conflict.
 */
router.get(
  "/students/statistics",
  studentController.getStatistics
);

/**
 * GET /api/students
 * Gets the list of all students with filters & pagination
 */
router.get(
  "/students",
  listStudentsValidators,
  handleValidationErrors,
  studentController.getAllStudents
);

/**
 * GET /api/students/:id
 * Retrieves a specific student by their ID.
 */
router.get(
  "/students/:id",
  idOnlyValidators,
  handleValidationErrors,
  studentController.getStudentById
);

/**
 * POST /api/students
 * Create a new student.
 */
router.post(
  "/students",
  createStudentValidators,
  handleValidationErrors,
  studentController.createStudent
);

/**
 * PUT /api/students/:id
 * Completely replaces a student's information.
 */
router.put(
  "/students/:id",
  updateStudentValidators,
  handleValidationErrors,
  studentController.updateStudent
);

/**
 * PATCH /api/students/:id
 * Partially updates a student.
 * NOTE: Points to 'updateStudent' because the controller handles partial updates dynamically.
 */
router.patch(
  "/students/:id",
  patchStudentValidators,
  handleValidationErrors,
  studentController.updateStudent
);

/**
 * DELETE /api/students/:id
 * Soft delete: marks the student as inactive.
 */
router.delete(
  "/students/:id",
  idOnlyValidators,
  handleValidationErrors,
  studentController.deleteStudent
);

module.exports = router;