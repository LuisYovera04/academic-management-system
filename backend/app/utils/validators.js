// Added by AlbertoSc16: Strict validations with express-validator

const { body, query, param } = require("express-validator");

// Validations

const firstNameValidator = body("first_name")
  .trim()
  .notEmpty().withMessage("The name is required.")
  .isLength({ max: 100 }).withMessage("The name cannot exceed 100 characters.");

const lastNameValidator = body("last_name")
  .trim()
  .notEmpty().withMessage("The last name is required.")
  .isLength({ max: 100 }).withMessage("The last name cannot exceed 100 characters.");

const emailValidator = body("email")
  .trim()
  .notEmpty().withMessage("Email is required.")
  .isEmail().withMessage("The email does not have a valid format.")
  .isLength({ max: 100 }).withMessage("The email cannot exceed 100 characters.")
  .normalizeEmail();

const majorValidator = body("major")
  .trim()
  .notEmpty().withMessage("The major is compulsory.")
  .isLength({ max: 100 }).withMessage("The major cannot exceed 100 characters.");

const semesterValidator = body("semester")
  .notEmpty().withMessage("The semester is mandatory.")
  .isInt({ min: 1, max: 12 }).withMessage("The semester must be an integer between 1 and 12.");

const gpaValidator = body("gpa")
  .optional({ nullable: true })
  .isFloat({ min: 0.0, max: 4.0 }).withMessage("The GPA must be a decimal number between 0.0 and 4.0.");

const enrollmentDateValidator = body("enrollment_date")
  .notEmpty().withMessage("The registration date is mandatory.")
  .isISO8601().withMessage("The registration date must be in ISO 8601 format (YYYY-MM-DD).")
  .toDate();

const phoneNumberValidator = body("phone_number")
  .optional({ nullable: true, checkFalsy: true })
  .trim()
  .isLength({ max: 20 }).withMessage("The phone number cannot exceed 20 characters.")
  .matches(/^\+?[\d\s\-().]{7,20}$/).withMessage("The phone number does not have a valid format.");

const isActiveValidator = body("is_active")
  .optional()
  .isBoolean().withMessage("The is_active field must be a Boolean value (true/false).")
  .toBoolean();

// ID validator in route parameter

const idParamValidator = param("id")
  .isInt({ min: 1 }).withMessage("The ID must be a positive integer.");

// Query parameter validators for filters and pagination

const queryFiltersValidator = [
  query("major")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("The major filter cannot exceed 100 characters."),

  query("semester")
    .optional()
    .isInt({ min: 1, max: 12 }).withMessage("The semester filter must be an integer between 1 and 12."),

  query("is_active")
    .optional()
    .isIn(["true", "false", "1", "0"]).withMessage("The is_active filter must be true or false."),

  query("page")
    .optional()
    .isInt({ min: 1 }).withMessage("The page must be an integer greater than or equal to 1.")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage("The limit must be an integer between 1 and 100.")
    .toInt(),
];

// --- Validation sets by endpoint ---

// --- Validations for POST (create student) ---
// All mandatory fields are required.

const createStudentValidators = [
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  majorValidator,
  semesterValidator,
  gpaValidator,
  enrollmentDateValidator,
  phoneNumberValidator,
  isActiveValidator,
];

// --- Validations for PUT (full update) ---
// -- All fields are required ---

const updateStudentValidators = [
  idParamValidator,
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  majorValidator,
  semesterValidator,
  gpaValidator,
  enrollmentDateValidator,
  phoneNumberValidator,
  isActiveValidator,
];

 // Validations for PATCH (partial update)

 // All fields are optional, but if provided, they must be valid.

const patchStudentValidators = [
  idParamValidator,
  body("first_name").optional().trim().isLength({ min: 1, max: 100 })
    .withMessage("The name cannot be empty or exceed 100 characters."),
  body("last_name").optional().trim().isLength({ min: 1, max: 100 })
    .withMessage("The last name cannot be empty or exceed 100 characters."),
  body("email").optional().trim().isEmail().withMessage("The email does not have a valid format.")
    .isLength({ max: 100 }).withMessage("The email cannot exceed 100 characters.").normalizeEmail(),
  body("major").optional().trim().isLength({ min: 1, max: 100 })
    .withMessage("The major cannot be empty or exceed 100 characters."),
  body("semester").optional().isInt({ min: 1, max: 12 })
    .withMessage("The semester must be an integer between 1 and 12."),
  gpaValidator,
  body("enrollment_date").optional().isISO8601()
    .withMessage("The registration date must be in ISO 8601 format (YYYY-MM-DD).").toDate(),
  phoneNumberValidator,
  isActiveValidator,
];

 // --- Validations for GET (list with filters) ---

 const listStudentsValidators = queryFiltersValidator;

// Validations for routes that only receive: id

const idOnlyValidators = [idParamValidator];

module.exports = {
  createStudentValidators,
  updateStudentValidators,
  patchStudentValidators,
  listStudentsValidators,
  idOnlyValidators,
};