import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaClock, FaRupeeSign, FaChalkboardTeacher, FaStar, FaRegStar } from 'react-icons/fa';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const openModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Poppins', sans-serif"
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '15px',
      position: 'relative',
      display: 'inline-block'
    },
    titleUnderline: {
      position: 'absolute',
      width: '80px',
      height: '4px',
      background: 'linear-gradient(90deg, #3498db, #9b59b6)',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '2px'
    },
    subtitle: {
      color: '#7f8c8d',
      fontSize: '1.1rem',
      maxWidth: '700px',
      margin: '0 auto'
    },
    coursesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '30px',
      padding: '20px 0'
    },
    courseCard: {
      background: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)'
      }
    },
    cardImage: {
      height: '180px',
      width: '100%',
      objectFit: 'cover',
      background: 'linear-gradient(45deg, #3498db, #9b59b6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    cardBody: {
      padding: '25px'
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      marginBottom: '15px',
      color: '#2c3e50',
      minHeight: '60px'
    },
    cardText: {
      color: '#7f8c8d',
      marginBottom: '20px',
      lineHeight: '1.6',
      minHeight: '80px'
    },
    metaInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    price: {
      color: '#e74c3c',
      fontSize: '1.4rem',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center'
    },
    duration: {
      color: '#3498db',
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.9rem'
    },
    enrollButton: {
      background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
      color: 'white',
      padding: '12px 0',
      borderRadius: '6px',
      textDecoration: 'none',
      display: 'block',
      textAlign: 'center',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(46, 204, 113, 0.3)'
      }
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      position: 'relative'
    },
    modalClose: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#7f8c8d',
      ':hover': {
        color: '#e74c3c'
      }
    },
    modalHeader: {
      padding: '25px',
      borderBottom: '1px solid #eee'
    },
    modalTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    modalBody: {
      padding: '25px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px'
    },
    modalImage: {
      height: '250px',
      width: '100%',
      borderRadius: '8px',
      objectFit: 'cover',
      background: 'linear-gradient(45deg, #3498db, #9b59b6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2.5rem',
      fontWeight: 'bold'
    },
    detailItem: {
      marginBottom: '15px'
    },
    detailLabel: {
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '5px',
      display: 'flex',
      alignItems: 'center'
    },
    detailValue: {
      color: '#7f8c8d'
    },
    modalFooter: {
      padding: '20px',
      borderTop: '1px solid #eee',
      textAlign: 'center'
    },
    modalEnrollButton: {
      background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
      color: 'white',
      padding: '12px 30px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(46, 204, 113, 0.3)'
      }
    },
    loading: {
      textAlign: 'center',
      padding: '50px',
      fontSize: '1.2rem',
      color: '#7f8c8d'
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading courses...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          Discover Our Courses
          <span style={styles.titleUnderline}></span>
        </h1>
        <p style={styles.subtitle}>
          Transform your future with our expertly designed courses taught by industry professionals
        </p>
      </div>

      <div style={styles.coursesGrid}>
        {courses.map(course => (
          <div 
            key={course._id} 
            style={styles.courseCard}
            onClick={() => openModal(course)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={styles.cardImage}>
              {course.title.substring(0, 2).toUpperCase()}
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{course.title}</h3>
              <p style={styles.cardText}>{course.description.substring(0, 100)}...</p>
              <div style={styles.metaInfo}>
                <span style={styles.price}>
                  <FaRupeeSign style={{ marginRight: '5px' }} />
                  {course.price}
                </span>
                <span style={styles.duration}>
                  <FaClock style={{ marginRight: '5px' }} />
                  {course.duration}
                </span>
              </div>
              <Link 
                to={`/book/${course._id}`} 
                style={styles.enrollButton}
                onClick={(e) => e.stopPropagation()}
              >
                Enroll Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedCourse && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>×</button>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedCourse.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[...Array(5)].map((_, i) => (
                  i < 4 ? <FaStar key={i} color="#f1c40f" /> : <FaRegStar key={i} color="#f1c40f" />
                ))}
                <span style={{ marginLeft: '10px', color: '#7f8c8d' }}>4.8 (120 reviews)</span>
              </div>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.modalImage}>
                {selectedCourse.title.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>
                    <FaChalkboardTeacher style={{ marginRight: '8px' }} />
                    Course Description
                  </div>
                  <div style={styles.detailValue}>{selectedCourse.description}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>
                    <FaClock style={{ marginRight: '8px' }} />
                    Duration
                  </div>
                  <div style={styles.detailValue}>{selectedCourse.duration}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>
                    <FaRupeeSign style={{ marginRight: '8px' }} />
                    Price
                  </div>
                  <div style={styles.detailValue}>₹{selectedCourse.price}</div>
                </div>
                {selectedCourse.instructor && (
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>
                      <FaChalkboardTeacher style={{ marginRight: '8px' }} />
                      Instructor
                    </div>
                    <div style={styles.detailValue}>{selectedCourse.instructor}</div>
                  </div>
                )}
                {selectedCourse.level && (
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Level</div>
                    <div style={styles.detailValue}>{selectedCourse.level}</div>
                  </div>
                )}
                {selectedCourse.requirements && (
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Requirements</div>
                    <div style={styles.detailValue}>{selectedCourse.requirements}</div>
                  </div>
                )}
              </div>
            </div>
            <div style={styles.modalFooter}>
              <Link 
                to={`/book/${selectedCourse._id}`} 
                style={styles.modalEnrollButton}
              >
                Enroll Now for ₹{selectedCourse.price}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseList;