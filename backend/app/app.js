// 1. Required by "Runtime: Node.js" and "Framework: Express.js"
const express = require('express');
const cors = require('cors');

// Import DB configuration to ensure connection starts on startup
const db = require('./database/db-config'); 

const app = express();

// --- Middlewares ---

// Enable CORS to allow requests from Frontend (React)
app.use(cors()); 

// Parse incoming JSON requests (Required for POST/PUT body)
app.use(express.json());

// --- Routes ---

// Initial test route to verify server status
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Academic Management API' });
});

// TO DO: Student Routes will be added here by Team Member 2 (alberto)
// const studentRoutes = require('./routes/student-routes');
// app.use('/api', studentRoutes);

// --- Server Startup ---

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});