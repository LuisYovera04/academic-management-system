import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api_service';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialFormState = {
    first_name: '',
    last_name: '',
    email: '',
    major: '',
    semester: 1,
    gpa: '',
    enrollment_date: new Date().toISOString().split('T')[0],
    phone_number: '',
    is_active: 1
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    if (id) {
      api.getById(id)
        .then((data) => setFormData(data.data || data))
        .catch((error) => console.error("Error loading student:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGlobalError("");
    
    const dataToSubmit = {
      ...formData,
      semester: parseInt(formData.semester),
      gpa: parseFloat(formData.gpa),
      is_active: parseInt(formData.is_active)
    };

    try {
      if (id) {
        await api.put(id, dataToSubmit);
        alert("Student updated successfully!");
      } else {
        await api.post(dataToSubmit);
        alert("Student created successfully!");
      }
      navigate('/students');
      
    } catch (err) {

      console.log("Backend Response Error:", err.response?.data);
      
      if (err.response && err.response.data) {
        const backendData = err.response.data;
        
      
        if (backendData.errors && Array.isArray(backendData.errors)) {
          const errorObj = {};
          backendData.errors.forEach(error => {
            errorObj[error.path || error.param] = error.msg;
          });
          setErrors(errorObj);
          setGlobalError("Validation failed. Check the fields below.");
        } 
        else {
          setGlobalError(backendData.message || backendData.error || "Unknown server error.");
        }
      } else {
        setGlobalError("Cannot connect to the server. Check if your Backend is running.");
      }
    }
  };

  // Styles
  const inputStyle = { width: "100%", padding: "8px", boxSizing: "border-box", marginTop: "5px" };
  const errorStyle = { color: 'red', fontSize: '0.85rem', marginTop: '2px', fontWeight: 'bold' };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", paddingBottom: "100px" }}>
      <h2>{id ? 'Edit Student' : 'Register New Student'}</h2>
      
      {globalError && (
        <div style={{ backgroundColor: "#ffdddd", borderLeft: "6px solid #f44336", padding: "10px", marginBottom: "20px" }}>
            <strong style={{color: "#f44336"}}>Error:</strong> {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>First Name:</label>
          <input name="first_name" value={formData.first_name} onChange={handleChange} style={inputStyle} required />
          {errors.first_name && <div style={errorStyle}>{errors.first_name}</div>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Last Name:</label>
          <input name="last_name" value={formData.last_name} onChange={handleChange} style={inputStyle} required />
          {errors.last_name && <div style={errorStyle}>{errors.last_name}</div>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div>
          <label style={{ fontWeight: "bold" }}>Major / Career:</label>
          <select 
              name="major" 
              value={formData.major} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "8px" }} 
              required
            >
              <option value="">Select a career...</option>
              <option value="Sistemas">Systems Engineering</option>
              <option value="Derecho">Law</option>
              <option value="Medicina">Medicine</option>
              <option value="Artes">Arts</option>
              <option value="Economía">Economics</option>
            </select>
          {errors.major && <small style={{ color: "red" }}>{errors.major}</small>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Enrollment Date:</label>
          <input name="enrollment_date" type="date" value={formData.enrollment_date} onChange={handleChange} style={inputStyle} required />
          {errors.enrollment_date && <div style={errorStyle}>{errors.enrollment_date}</div>}
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            <div style={{ flex: 1 }}>
                <label>Semester:</label>
                <input name="semester" type="number" value={formData.semester} onChange={handleChange} style={inputStyle} required />
                 {errors.semester && <div style={errorStyle}>{errors.semester}</div>}
            </div>
            <div style={{ flex: 1 }}>
                <label>GPA:</label>
                <input name="gpa" type="number" step="0.01" value={formData.gpa} onChange={handleChange} style={inputStyle} required />
                 {errors.gpa && <div style={errorStyle}>{errors.gpa}</div>}
            </div>
        </div>

        <div style={{ marginBottom: "25px" }}>
            <label>Phone Number:</label>
            <input name="phone_number" value={formData.phone_number} onChange={handleChange} style={inputStyle} />
            {errors.phone_number && <div style={errorStyle}>{errors.phone_number}</div>}
        </div>

        <button type="submit" style={{ padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", width: "100%", fontWeight: "bold", cursor: "pointer" }}>
          {id ? 'Update Student' : 'Save Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;