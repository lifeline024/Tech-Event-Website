import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <p>© {currentYear} Your Company. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px 0',
    backgroundColor: '#1e1e1e',
    color: '#bbb',
    fontSize: '0.9rem',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};
