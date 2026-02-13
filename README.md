# Full-Stack Academic Management System 🎓

This is the main repository for the **Academic Management System**, a university project developed by a team of four students. The system provides a comprehensive solution for managing student records, combining a robust RESTful API on the backend with a dynamic and responsive user interface on the frontend.

---

## 🏗️ Project Architecture

The project is divided into two main applications that communicate with each other:

* **Backend (`/backend`):** Server developed in Node.js and Express that handles business logic, data validation, and database connection (SQLite).
* **Frontend (`/frontend`):** Client application developed with React and Vite that provides the graphical interface for administrators.

---

## 🛠️ Tech Stack

### Backend
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3
* **Validation:** express-validator
* **Architecture:** Model-View-Controller (MVC)

### Frontend
* **Core Library:** React (bundled with Vite)
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Styling:** Pure CSS3 with responsive design

---

## 🚀 Key Features

1. **Statistics Dashboard:** Real-time visualization of total enrolled students, overall GPA average, and distribution by academic major.
2. **Full Management (CRUD):** Register, read, update, and delete student records seamlessly.
3. **Search & Filtering:** Ability to search for students by first or last name directly through the database.
4. **Soft Delete System:** Logical deletion of records (marked as inactive instead of permanently deleted) to maintain historical data integrity.
5. **Data Validation:** Protection on both ends (Frontend and Backend) to ensure unique emails, correct GPA formats, and valid major selections.

---

## 🤖 Artificial Intelligence (AI) Usage

In the context of modern software development, this project integrated the use of Artificial Intelligence (specifically **Google Gemini**) as a technical assistance and *pair programming* tool.

## 👥 Authors

Liz Falcon C.I: 30.924.770
Armando Moreira C.I: 31.903.902
Alberto Sanchez C.I: 30.925.181
Luis Yovera C.I: 31.281.660