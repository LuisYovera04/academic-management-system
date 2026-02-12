import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api_service';

const StudentDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch individual student data
    api.getById(id)
      .then((response) => {
        // Adjust based on your backend structure (data.data or just data)
        setStudent(response.data || response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="students-container">Loading student details...</div>;
  
  if (!student) return (
    <div className="students-container">
      <h2>Student not found</h2>
      <Link to="/students" className="btn-edit">Back to List</Link>
    </div>
  );

  return (
    <div className="students-container">
      <div className="student-card-detail">
        <h2 className="section-title">Student Profile</h2>
        
        <div className="detail-grid">
          <div className="detail-item">
            <strong>Full Name:</strong> 
            <span>{student.first_name} {student.last_name}</span>
          </div>
          
          <div className="detail-item">
            <strong>Email:</strong> 
            <span>{student.email}</span>
          </div>
          
          <div className="detail-item">
            <strong>Major / Career:</strong> 
            <span>{student.major}</span>
          </div>

          <div className="detail-item">
            <strong>Current Semester:</strong> 
            <span>{student.semester}</span>
          </div>

          <div className="detail-item">
            <strong>GPA:</strong> 
            <span className="gpa-badge">{student.gpa}</span>
          </div>

          <div className="detail-item">
            <strong>Enrollment Date:</strong> 
            <span>{new Date(student.enrollment_date).toLocaleDateString()}</span>
          </div>

          <div className="detail-item">
            <strong>Phone Number:</strong> 
            <span>{student.phone_number || 'N/A'}</span>
          </div>

          <div className="detail-item">
            <strong>Status:</strong> 
            <span>{student.is_active ? '✅ Active' : '❌ Inactive'}</span>
          </div>
        </div>

        <div className="detail-actions" style={{ marginTop: '20px' }}>
          <Link to="/students" className="btn-edit" style={{ backgroundColor: '#7f8c8d', marginRight: '10px' }}>
            ← Back to List
          </Link>
          <Link to={`/students/edit/${student.id}`} className="btn-edit">
            Edit Information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;