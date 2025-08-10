import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { FaFileExcel, FaSearch, FaSignOutAlt } from "react-icons/fa";

// Styled Components
const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e1e4e8;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const EventSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-width: 250px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  padding-left: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-width: 250px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23718096'%3E%3Cpath d='M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 0.8rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#4a90e2' : props.success ? '#28a745' : props.danger ? '#dc3545' : '#6c757d'};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.primary ? '#3b82f6' : props.success ? '#218838' : props.danger ? '#c82333' : '#5a6268'};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const TableContainer = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 2px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #edf2f7;
  color: #4a5568;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #718096;
  font-style: italic;
  margin: 2rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 2rem;
`;

const LoginForm = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

function Admin() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      fetchEvents();
    }
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    axios
      .get("https://tech-event-website.onrender.com/api/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  };

  const fetchParticipants = (eventId) => {
    if (!eventId) {
      setParticipants([]);
      return;
    }
    setLoading(true);
    setSelectedEvent(eventId);
    axios
      .get(`https://tech-event-website.onrender.com/api/registration/event/${eventId}`)
      .then(res => setParticipants(res.data))
      .catch(err => {
        console.error("Error fetching participants:", err);
        setParticipants([]);
      })
      .finally(() => setLoading(false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      localStorage.setItem("adminAuthenticated", "true");
      setIsAuthenticated(true);
      fetchEvents();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAuthenticated(false);
    setPassword("");
    navigate("/");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredParticipants = participants.filter(p => 
    p.participantName.toLowerCase().includes(searchTerm) ||
    p.email.toLowerCase().includes(searchTerm) ||
    p.mobileNo.toLowerCase().includes(searchTerm) ||
    p.registrationNo.toLowerCase().includes(searchTerm) ||
    p.transactionId.toLowerCase().includes(searchTerm)
  );

  const exportToExcel = () => {
    setIsExporting(true);
    try {
      const event = events.find(e => e._id === selectedEvent);
      
      const exportData = filteredParticipants.map(p => ({
        "Event Name": event?.name || "N/A",
        "Participant Name": p.participantName,
        "Email": p.email,
        "Phone": p.mobileNo,
        "Registration No": p.registrationNo,
        "Transaction ID": p.transactionId,
        "Registered At": new Date(p.createdAt).toLocaleString(),
        "Team Size": event?.teamSize || "N/A",
        "Entry Fee": event?.entryFee || "N/A"
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Participants");
      
      const fileName = `${event?.name || "Event"}_Participants_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginForm>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
          <Button type="submit" primary>Login</Button>
        </form>
      </LoginForm>
    );
  }

  return (
    <AdminContainer>
      <Header>
        <Title>Event Management Dashboard</Title>
        <Button onClick={handleLogout} danger>
          <FaSignOutAlt /> Logout
        </Button>
      </Header>

      <Controls>
        <EventSelect
          onChange={(e) => fetchParticipants(e.target.value)}
          value={selectedEvent}
        >
          <option value="">Select an event</option>
          {events.map(e => (
            <option key={e._id} value={e._id}>
              {e.name} ({e.teamSize})
            </option>
          ))}
        </EventSelect>

        <SearchInput
          type="text"
          placeholder="Search participants..."
          value={searchTerm}
          onChange={handleSearch}
          disabled={!selectedEvent}
        />

        {filteredParticipants.length > 0 && (
          <Button 
            onClick={exportToExcel} 
            success
            disabled={isExporting}
          >
            <FaFileExcel /> {isExporting ? "Exporting..." : "Export to Excel"}
          </Button>
        )}
      </Controls>

      {loading && <LoadingText>Loading data...</LoadingText>}

      {!loading && selectedEvent && filteredParticipants.length === 0 && (
        <EmptyState>
          <p>
            {searchTerm 
              ? "No matching participants found" 
              : "No participants registered for this event yet"}
          </p>
        </EmptyState>
      )}

      {filteredParticipants.length > 0 && (
        <TableContainer>
          <StyledTable>
            <TableHeader>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Registration No</Th>
                <Th>Transaction ID</Th>
                <Th>Registered At</Th>
              </tr>
            </TableHeader>
            <tbody>
              {filteredParticipants.map((p, i) => (
                <TableRow key={i}>
                  <Td>{p.participantName}</Td>
                  <Td>{p.email}</Td>
                  <Td>{p.mobileNo}</Td>
                  <Td>{p.registrationNo}</Td>
                  <Td style={{ fontFamily: "monospace" }}>{p.transactionId}</Td>
                  <Td>{new Date(p.createdAt).toLocaleString()}</Td>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </AdminContainer>
  );
}

export default Admin;
