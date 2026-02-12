# 🎓 Academic Management System - Backend API

A RESTful API developed with **Node.js** and **Express** for managing academic student data. This backend serves data to the Frontend (React) and handles full CRUD operations, advanced filtering, pagination, and statistics.

## 🚀 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3 (Lightweight & Local)
* **Validation:** Express-Validator
* **Security/Utils:** CORS

---

## 🛠️ Installation & Setup

Follow these steps to run the server locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 14 or higher).

### 2. Install Dependencies
Open a terminal in the `backend` folder and run:

```bash
npm install
```

### 3. Initialize Database
Before starting the server, you must create the table and populate it with seed data. Run:

```bash
node app/database/init-db.js
```
*This will create a `database.db` file in the `database` folder with 15 initial students.*

### 4. Run Server
For development (with auto-reload):

```bash
npm run dev
```
The server will run at: `http://localhost:3000`

---

## 📡 API Documentation (Endpoints)

All routes are prefixed with `/api`.

### 📊 1. Statistics
Retrieves total count, average GPA, and distribution by major/semester.

* **Method:** `GET`
* **URL:** `/api/students/statistics`

### 🔍 2. List Students (With Filters & Pagination)
Retrieves the list of students. You can combine multiple filters.

* **Method:** `GET`
* **URL:** `/api/students`
* **Query Params (Optional):**
    * `page`: Page number (Default: 1).
    * `limit`: Results per page (Default: 10).
    * `major`: Filter by major (e.g., `Engineering`).
    * `semester`: Filter by semester (e.g., `4`).
    * `is_active`: `true` (active) or `false` (inactive).

**Usage Example:**
`GET /api/students?page=1&limit=5&major=Engineering`

### 👤 3. Get Student by ID
* **Method:** `GET`
* **URL:** `/api/students/:id`

### ➕ 4. Create Student
* **Method:** `POST`
* **URL:** `/api/students`
* **Required Body (JSON):**
    ```json
    {
      "first_name": "Luis",
      "last_name": "Doe",
      "email": "luis.doe@uni.edu",
      "major": "Engineering",
      "semester": 1,
      "gpa": 4.0,
      "enrollment_date": "2024-02-12",
      "phone_number": "+584121234567"
    }
    ```

### ✏️ 5. Update Student (Full)
Completely replaces the student's information.
* **Method:** `PUT`
* **URL:** `/api/students/:id`

### 🛠️ 6. Update Student (Partial)
Updates only the sent fields (ideal for editing a single value).
* **Method:** `PATCH`
* **URL:** `/api/students/:id`
* **Body Example:**
    ```json
    {
      "phone_number": "+58999999999"
    }
    ```

### 🗑️ 7. Delete Student (Soft Delete)
Does not remove the record from the database; it only updates the status `is_active` to `0` (false).
* **Method:** `DELETE`
* **URL:** `/api/students/:id`

---

## 📂 Project Structure

```
backend/
├── app/
│   ├── controllers/   # Business logic (student-controller.js)
│   ├── routes/        # Endpoint definitions (student-routes.js)
│   ├── database/      # SQLite config & seed scripts
│   ├── utils/         # Validations (validators.js)
│   └── app.js         # Application entry point
├── package.json       # Dependencies & Scripts
└── README.md          # Documentation
```

---

## 🤖 Generative AI Declaration

Tools used during the development of this project:

* **GitHub Copilot / ChatGPT / Gemini:** Used for code generation assistance, debugging errors (e.g., configuring CORS and fixing file paths), and documentation translation.
* **Purpose:** To optimize development time and solve specific configuration issues in the backend.

## 👥 Authors

Liz Falcon C.I: 30.924.770
Armando Moreira C.I: 31.903.902
Alberto Sanchez C.I: 30.925.181
Luis Yovera C.I: 31.281.660