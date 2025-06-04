import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch bookings');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-bookings-container">
      <h2 className="heading">
        All Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Reference ID</th>
                <th>Amount</th>
                <th>Course</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id}>
                  <td>{i + 1}</td>
                  <td>{b.name || 'N/A'}</td>
                  <td>{b.email || 'N/A'}</td>
                  <td>{b.phone || 'N/A'}</td>
                  <td>{b.referenceId || 'N/A'}</td>
                  <td>{b.amount || 'N/A'}</td>
                  <td>{b.course || 'N/A'}</td>
                  <td>{formatDate(b.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .admin-bookings-container {
          max-width: 1200px;
          margin: 30px auto;
          padding: 0 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        .heading {
          color: #fff;
          font-weight: 700;
          font-size: 2.5rem;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 30px;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
          background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .no-bookings {
          text-align: center;
          font-size: 1.1rem;
          color: #666;
          margin-top: 40px;
        }
        .loading, .error {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 50px;
          color: #666;
        }
        .table-wrapper {
          overflow-x: auto;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-radius: 8px;
          background: #fff;
          padding: 10px;
        }
        .bookings-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }
        .bookings-table thead {
          background-color: #004d99;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .bookings-table th,
        .bookings-table td {
          text-align: left;
          padding: 12px 15px;
          border-bottom: 1px solid #ddd;
          font-size: 0.95rem;
          vertical-align: middle;
        }
        .bookings-table tbody tr:hover {
          background-color: #f1f8ff;
          cursor: default;
        }
        .bookings-table tbody tr:nth-child(even) {
          background-color: #fafafa;
        }
        @media (max-width: 768px) {
          .bookings-table th,
          .bookings-table td {
            padding: 8px 10px;
            font-size: 0.9rem;
          }
          .heading {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}
