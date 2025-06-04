import React, { useState } from 'react';
import AdminAddCourse from './AdminAddCourse';
import AdminDashboard from './AdminDashboard';
import AdminRemoveCourse from './AdminRemoveCourse';
import { Link } from 'react-router-dom';
import { FiHome, FiBookOpen } from 'react-icons/fi';
import UserManagement from './UserManagement';
import AdminBookings from './AdminBooking';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = 'admin123'; // Set your desired admin password here

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  // Show password screen before admin dashboard
  if (!isAuthorized) {
    return (
      <div style={styles.loginContainer}>
        <form onSubmit={handlePasswordSubmit} style={styles.loginBox}>
          <h2 style={{ color: '#00c7a5', marginBottom: '1rem' }}>🔒 Enter Admin Password</h2>
          <input
            type="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            placeholder="Enter Password"
            style={styles.input}
          />
          <button type="submit" style={styles.loginBtn}>Unlock</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <h2 style={styles.logo}>Zenith Admin</h2>
          <div style={styles.navIcons}>
            <Link to="/" style={styles.iconLink}>
              <FiHome size={20} />
              <span style={styles.iconLabel}>Home</span>
            </Link>
          </div>
        </div>

        <div style={styles.menu}>
          <SidebarButton label="Add Course" isActive={activeTab === 'addCourse'} onClick={() => setActiveTab('addCourse')} />
          <SidebarButton label="Remove Course" isActive={activeTab === 'removeCourse'} onClick={() => setActiveTab('removeCourse')} />
          <SidebarButton label="User Manage" isActive={activeTab === 'userManage'} onClick={() => setActiveTab('userManage')} />
          <SidebarButton label="Booking Info" isActive={activeTab === 'bookinginfo'} onClick={() => setActiveTab('bookinginfo')} />
          <SidebarButton label="Messages" isActive={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.card}>
          {!activeTab && (
            <div style={styles.welcomeCard}>
              <div style={{ fontSize: '2.2rem', color: '#0d6efd', marginBottom: '1rem' }}>👨‍💼 Admin Panel Dashboard</div>
              <p style={{ marginBottom: '1rem', color: '#333' }}>
                Welcome, Administrator! You have full control of the system.
              </p>
              <p style={{ fontSize: '1.125rem', color: '#555' }}>
                Use the sidebar to manage users, courses, bookings, messages, and more.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <span style={styles.status}>🔧 System Status: <strong>Operational</strong></span>
              </div>
            </div>
          )}
          {activeTab === 'addCourse' && <AdminAddCourse />}
          {activeTab === 'removeCourse' && <AdminRemoveCourse />}
          {activeTab === 'userManage' && <UserManagement />}
          {activeTab === 'bookinginfo' && <AdminBookings />}
          {activeTab === 'messages' && <AdminDashboard />}
        </div>
      </main>
    </div>
  );
}

function SidebarButton({ label, isActive, onClick }) {
  return (
    <button
      style={{
        ...styles.button,
        ...(isActive ? styles.activeButton : {}),
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#101010',
    color: '#eee',
  },
  loginContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  loginBox: {
    padding: '2rem',
    backgroundColor: '#222',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #00c7a5',
    marginBottom: '1rem',
    width: '250px',
  },
  loginBtn: {
    padding: '10px 20px',
    backgroundColor: '#00c7a5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  sidebar: {
    width: '250px',
    background: 'linear-gradient(180deg, #1f1f1f, #121212)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '3px 0 10px rgba(0,0,0,0.6)',
    padding: '20px',
  },
  logoSection: {
    marginBottom: '50px',
  },
  logo: {
    fontSize: '1.8rem',
    color: '#00c7a5',
    textAlign: 'center',
    fontWeight: 'bold',
    userSelect: 'none',
  },
  navIcons: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  iconLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  iconLabel: {
    fontSize: '0.9rem',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    background: 'transparent',
    border: 'none',
    color: 'red',
    fontSize: '1.1rem',
    textAlign: 'left',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: 'inset 4px 0 0 #009e86',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  activeButton: {
    backgroundColor: '#00c7a5',
    color: '#101010',
    fontWeight: 'bold',
    boxShadow: 'inset 4px 0 0 #009e86',
  },
  main: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#181818',
    overflowY: 'auto',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
    minHeight: '80vh',
  },
  welcomeCard: {
    textAlign: 'center',
    fontSize: '1.75rem',
    color: '#00c7a5',
    padding: '2.5rem',
    marginTop: '3rem',
    background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    fontWeight: '600',
    lineHeight: '1.7',
    maxWidth: '800px',
    margin: 'auto',
    transition: 'all 0.3s ease-in-out',
    border: '1px solid #b2ebf2',
  },
  status: {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '1rem',
    boxShadow: '0 4px 8px rgba(13, 110, 253, 0.3)',
    display: 'inline-block',
  },
};
