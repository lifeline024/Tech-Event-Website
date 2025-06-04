import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>📬 Contact Messages</h2>

      {messages.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr
                  key={index}
                  style={styles.tr}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <td style={styles.td}>{msg.name}</td>
                  <td style={styles.td}>{msg.email}</td>
                  <td style={styles.td}>{msg.subject}</td>
                  <td style={styles.td}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.noData}>No messages yet.</p>
      )}

      {/* Modal */}
      {selectedMessage && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>{selectedMessage.subject}</h3>
            <p><strong>Name:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
            <p><strong>Message:</strong></p>
            <p style={styles.messageText}>{selectedMessage.message}</p>
            <button style={styles.closeBtn} onClick={() => setSelectedMessage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: '#1e1e2f',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
    color: '#eee',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    overflowX: 'auto',
  },
  heading: {
    fontSize: '1.8rem',
    color: '#00c7a5',
    marginBottom: '20px',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 12px',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    backgroundColor: '#2b2b3c',
    color: '#00c7a5',
    fontSize: '0.95rem',
    borderBottom: '2px solid #333',
  },
  tr: {
    backgroundColor: '#29293d',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  td: {
    padding: '12px 16px',
    borderBottom: '1px solid #333',
    fontSize: '0.9rem',
    color: '#ddd',
    wordBreak: 'break-word',
  },
  noData: {
    color: '#bbb',
    fontStyle: 'italic',
    fontSize: '1rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#2e2e3e',
    padding: '25px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    color: '#fff',
    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
  },
  modalTitle: {
    fontSize: '1.4rem',
    color: '#00c7a5',
    marginBottom: '15px',
  },
  messageText: {
    backgroundColor: '#1e1e2f',
    padding: '10px',
    borderRadius: '5px',
    whiteSpace: 'pre-wrap',
    marginTop: '5px',
  },
  closeBtn: {
    marginTop: '20px',
    backgroundColor: '#00c7a5',
    color: '#121212',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};
