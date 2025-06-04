import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSave, FaTimes, FaSpinner } from 'react-icons/fa';

export default function AdminRemoveCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load courses. Please try again.');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      await fetchCourses();
    } catch (err) {
      alert('Failed to delete course');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const startEditing = (course) => {
    setEditingId(course._id);
    setEditForm({
      title: course.title,
      description: course.description,
      duration: course.duration,
      price: course.price,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/courses/${editingId}`, editForm);
      setEditingId(null);
      await fetchCourses();
    } catch (err) {
      alert('Failed to update course');
      console.error(err);
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif"
    },
    header: {
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '30px',
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px',
      display: 'inline-block'
    },
    searchInputWrapper: {
      marginBottom: '20px'
    },
    searchInput: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '6px'
    },
    courseList: {
      listStyle: 'none',
      padding: '0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px'
    },
    courseCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '20px',
      transition: 'transform 0.3s, box-shadow 0.3s',
      borderLeft: '4px solid #3498db'
    },
    courseTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#2c3e50'
    },
    courseDetail: {
      color: '#7f8c8d',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px'
    },
    editButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'background-color 0.3s'
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'background-color 0.3s'
    },
    saveButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'background-color 0.3s'
    },
    cancelButton: {
      backgroundColor: '#95a5a6',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'background-color 0.3s'
    },
    inputField: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px'
    },
    error: {
      color: '#e74c3c',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#fadbd8',
      borderRadius: '8px'
    },
    emptyState: {
      textAlign: 'center',
      color: '#7f8c8d',
      padding: '40px'
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <FaSpinner className="spin" style={{ fontSize: '2rem', color: '#3498db' }} />
      </div>
    );
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Manage Courses</h1>

      {/* Search Input */}
      <div style={styles.searchInputWrapper}>
        <input
          type="text"
          placeholder="Search by course title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {courses.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No courses found. Add some courses to get started.</p>
        </div>
      ) : (
        <ul style={styles.courseList}>
          {courses
            .filter(course =>
              course.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(course => (
              <li key={course._id} style={styles.courseCard}>
                {editingId === course._id ? (
                  <div>
                    <input
                      name="title"
                      value={editForm.title}
                      onChange={handleChange}
                      placeholder="Course Title"
                      style={styles.inputField}
                    />
                    <input
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      placeholder="Description"
                      style={styles.inputField}
                    />
                    <input
                      name="duration"
                      value={editForm.duration}
                      onChange={handleChange}
                      placeholder="Duration"
                      style={styles.inputField}
                    />
                    <input
                      name="price"
                      value={editForm.price}
                      onChange={handleChange}
                      placeholder="Price"
                      style={styles.inputField}
                    />
                    <div style={styles.buttonGroup}>
                      <button 
                        onClick={saveEdit} 
                        style={styles.saveButton}
                        disabled={isDeleting}
                      >
                        <FaSave /> Save
                      </button>
                      <button 
                        onClick={cancelEditing} 
                        style={styles.cancelButton}
                        disabled={isDeleting}
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 style={styles.courseTitle}>{course.title}</h3>
                    <p style={styles.courseDetail}>{course.description}</p>
                    <p style={styles.courseDetail}>Duration: {course.duration}</p>
                    <p style={styles.courseDetail}>Price: ₹{course.price}</p>
                    <div style={styles.buttonGroup}>
                      <button
                        onClick={() => startEditing(course)}
                        style={styles.editButton}
                        disabled={isDeleting}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        style={styles.deleteButton}
                        disabled={isDeleting}
                      >
                        {isDeleting ? <FaSpinner className="spin" /> : <FaTrash />} Remove
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
