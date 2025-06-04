import React from 'react';
import { FaCheck, FaBook, FaUserTie } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const isLoggedIn = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  // common style to disable pointer events when not logged in
  const disabledStyle = {
    pointerEvents: 'none',
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  // click handler for buttons or links to redirect to login if not logged in
  const handleClick = (e, targetPath) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login first to access this feature.");
      navigate("/login");
    }
  };

  // Rest of your styles as-is ...

  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
          <span style={{
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            color: '#0d6efd',
            padding: '8px 16px',
            borderRadius: '50px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '24px',
            display: 'inline-block'
          }}>
            Transforming Lives Through Education
          </span>
          
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '24px', lineHeight: '1.2' }}>
            Welcome to <span style={{ color: '#0d6efd' }}>Zenith</span>
          </h1>
          
          <p style={{
            color: '#6c757d',
            fontSize: '1.25rem',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: '1.5'
          }}>
            Your path to academic excellence and personal growth starts here. 
            We empower students to reach their highest potential.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center' }}>
            <button
              style={isLoggedIn ? {
                backgroundColor: '#0d6efd',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '1.125rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              } : { ...disabledStyle, padding: '12px 24px', borderRadius: '6px', fontSize: '1.125rem', fontWeight: '500' }}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  alert("Please login first.");
                  navigate("/login");
                }
              }}
              onMouseEnter={(e) => isLoggedIn && (e.target.style.backgroundColor = '#0b5ed7')}
              onMouseLeave={(e) => isLoggedIn && (e.target.style.backgroundColor = '#0d6efd')}
              disabled={!isLoggedIn}
            >
              Explore Programs
            </button>
            
            <button
              style={isLoggedIn ? {
                backgroundColor: 'transparent',
                color: '#0d6efd',
                padding: '12px 24px',
                borderRadius: '6px',
                border: '1px solid #0d6efd',
                fontSize: '1.125rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              } : { ...disabledStyle, padding: '12px 24px', borderRadius: '6px', fontSize: '1.125rem', fontWeight: '500', border: '1px solid #0d6efd' }}
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  alert("Please login first.");
                  navigate("/login");
                  
                } else {
                  navigate("/consultation");
                }
              }}
              onMouseEnter={(e) => {
                if (isLoggedIn) {
                  e.target.style.backgroundColor = '#0d6efd';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (isLoggedIn) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#0d6efd';
                }
              }}
              disabled={!isLoggedIn}
      >
              Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        backgroundColor: '#f8f9fa',
        padding: '80px 0'
      }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '48px',
            color: '#212529'
          }}>
            Why Choose Zenith?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[{
              icon: <FaCheck style={{ color: '#0d6efd', fontSize: '30px' }} />,
              title: 'Proven Results',
              text: 'Our students consistently achieve top scores and university placements.'
            }, {
              icon: <FaUserTie style={{ color: '#0d6efd', fontSize: '30px' }} />,
              title: 'Expert Faculty',
              text: 'Learn from IIT/NIT alumni with 10+ years of teaching experience.'
            }, {
              icon: <FaBook style={{ color: '#0d6efd', fontSize: '30px' }} />,
              title: 'Personalized Approach',
              text: 'Customized learning plans tailored to each student\'s needs.'
            }].map(({ icon, title, text }, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: 'none',
                  height: '100%',
                  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: isLoggedIn ? 'default' : 'not-allowed',
                  pointerEvents: isLoggedIn ? 'auto' : 'none',
                  opacity: isLoggedIn ? 1 : 0.5,
                }}
                onMouseEnter={(e) => isLoggedIn && Object.assign(e.currentTarget.style, { transform: 'translateY(-5px)', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)' })}
                onMouseLeave={(e) => isLoggedIn && Object.assign(e.currentTarget.style, { transform: 'none', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)' })}
              >
                <div style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    padding: '20px',
                    marginBottom: '24px'
                  }}>
                    {icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    marginBottom: '16px',
                    color: '#212529'
                  }}>{title}</h3>
                  <p style={{ color: '#6c757d', marginBottom: '0' }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: '#0d6efd',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '24px' }}>Ready to Reach Your Zenith?</h2>
          <p style={{
            opacity: '0.75',
            fontSize: '1.25rem',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: '1.5'
          }}>
            Join hundreds of successful students who transformed their academic journey with us.
          </p>
          <Link
            to={isLoggedIn ? "/courses" : "/login"}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("Please login first.");
              }
            }}
            style={{ textDecoration: 'none', pointerEvents: isLoggedIn ? 'auto' : 'none', opacity: isLoggedIn ? 1 : 0.5, cursor: isLoggedIn ? 'pointer' : 'not-allowed' }}
          >
            <button
              style={{
                backgroundColor: '#ffffff',
                color: '#212529',
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '1.125rem',
                fontWeight: '500',
                cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s ease',
                opacity: isLoggedIn ? 1 : 0.5
              }}
              onMouseEnter={(e) => isLoggedIn && (e.target.style.backgroundColor = '#f8f9fa')}
              onMouseLeave={(e) => isLoggedIn && (e.target.style.backgroundColor = '#ffffff')}
              disabled={!isLoggedIn}
            >
              Enroll Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
