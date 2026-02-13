# Academic Management System - Frontend 🎓

This is the client-side application for the **Academic Management System**, developed by a team of four students as a full-stack solution for educational record keeping.

---

## 🛠️ Tech Stack
* **Framework:** React (Vite)
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Styling:** Custom CSS3 focusing on a clean, responsive User Experience

---

## 🚀 Key Features Implemented

### 1. Interactive Insights Dashboard (Home)
* **Real-time Analytics:** Consumes the `GET /api/students/statistics` endpoint to provide live data.
* **Institutional Metrics:** Displays total enrollment, global GPA average, and dynamic distribution bars by academic major.

### 2. Student Administration (Full CRUD)
* **Centralized Registry:** A clean table interface showing full names, emails, and careers.
* **Live Search:** Search bar functionality that filters records by name or surname directly through backend queries.
* **Student Profiles:** Individual profile views (`/students/:id`) displaying comprehensive academic and contact details.
* **Soft Delete System:** Implements logical deletion where records are marked as "Inactive" to preserve historical data integrity.

### 3. Optimized Forms
* **Hybrid Component:** A single, intelligent form used for both creating new students and updating existing records.
* **Error Management:** Real-time display of backend validation errors (e.g., duplicate emails or invalid data types).
* **Career Selection:** Standardized dropdown menu for majors to ensure database consistency.

---

## ⚙️ Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd academic-management-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Backend Configuration:**
   Verify the API base URL in `src/services/api_service.js` is set to your backend:
   ```javascript
   const API_URL = "http://localhost:3000/api";
   ```

4. **Start the development environment:**
   ```bash
   npm run dev
   ```

---

## 👥 Authors

Liz Falcon C.I: 30.924.770
Armando Moreira C.I: 31.903.902
Alberto Sanchez C.I: 30.925.181
Luis Yovera C.I: 31.281.660