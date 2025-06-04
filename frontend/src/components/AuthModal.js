import React, { useState } from 'react';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

export default function AuthModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()} // prevent modal close on content click
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 20,
          width: '90%',
          maxWidth: 420,
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <button
            className={activeTab === 'login' ? 'btn btn-primary' : 'btn btn-outline-primary'}
            style={{ marginRight: 10 }}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'btn btn-primary' : 'btn btn-outline-primary'}
            onClick={() => setActiveTab('signup')}
          >
            Register
          </button>
        </div>
        {/* Show Login or Signup based on activeTab */}
        {activeTab === 'login' ? (
          <Login onClose={onClose} />
        ) : (
          <Signup onClose={onClose} />
        )}
      </div>
    </div>
  );
}
