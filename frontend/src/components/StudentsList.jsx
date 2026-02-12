import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✨ Importante para navegar
import api from "../services/api_service.js";

export default function StudentsList() {
  const [students, setStudents] = useState([]);

  // Función para cargar estudiantes (la sacamos fuera para reusarla)
  // Load students and filter by active status
  const loadStudents = () => {
    api.getAll()
      .then(data => {
        // We only keep students where is_active is 1 (or true)
        const activeStudents = data.filter(student => student.is_active === 1 || student.is_active === true);
        setStudents(activeStudents);
      })
      .catch(error => console.error("Error loading students:", error));
  };
  useEffect(() => {
    loadStudents();
  }, []);

  // Función para eliminar
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este estudiante?")) {
      try {
        await api.delete(id);
        alert("Estudiante eliminado");
        loadStudents(); // Recargamos la lista automáticamente
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar");
      }
    }
  };

  // ... (imports)

return (
  <div className="students-container">
    <h2 className="section-title">Student Records</h2>
    
    <div className="actions-bar">
      <Link to="/students/new" className="btn-add">
        + Register New Student
      </Link>
    </div>

    <ul className="student-list">
      {students.map((s) => (
        <li key={s.id} className="student-card">
          <div className="student-info">
            <span className="student-name">{s.first_name} {s.last_name}</span>
            <span className="student-major">{s.major}</span>
            <span className="student-email">{s.email}</span>
          </div>
          
          <div className="student-actions">
  
        <Link to={`/students/${s.id}`} className="btn-view" style={{ marginRight: '8px' }}>
          View
        </Link>
  

        <Link to={`/students/edit/${s.id}`} className="btn-edit" style={{ marginRight: '8px' }}>
          Edit
        </Link>
  

          <button onClick={() => handleDelete(s.id)} className="btn-delete">
            Delete
          </button>
        </div>
          
        </li>
      ))}
    </ul>
  </div>
);
}