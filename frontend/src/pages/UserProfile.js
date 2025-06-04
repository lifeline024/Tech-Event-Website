import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiCalendar, FiMail, FiPhone, FiHome, FiMessageSquare, FiDollarSign } from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const ProfileContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
`;

const UserName = styled.h2`
  font-size: 1.8rem;
  margin: 0.5rem 0;
  color: #2d3748;
`;

const UserEmail = styled.p`
  color: #718096;
  margin: 0.2rem 0;
`;

const Section = styled(motion.div)`
  margin-bottom: 2.5rem;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #edf2f7;

  svg {
    margin-right: 0.5rem;
    color: #667eea;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  svg {
    margin-right: 0.8rem;
    color: #667eea;
  }
`;

const BookingCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const BookingDetail = styled.p`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: #4a5568;

  svg {
    margin-right: 0.5rem;
    color: #a0aec0;
  }

  strong {
    color: #2d3748;
    margin-right: 0.3rem;
  }
`;

const MessageStatus = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${props => props.hasMessaged ? '#f0fff4' : '#fff5f5'};
  border-radius: 8px;
  color: ${props => props.hasMessaged ? '#38a169' : '#e53e3e'};
  font-weight: 500;

  svg {
    margin-right: 0.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #718096;
  background: #f8fafc;
  border-radius: 8px;
`;

function UserProfile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [hasMessaged, setHasMessaged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("No user email found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using Promise.all to fetch all data in parallel
        const [userRes, bookingRes, messageRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/profile/user/${userEmail}`),
          axios.get(`http://localhost:5000/api/profile/bookings/${userEmail}`),
          axios.get(`http://localhost:5000/api/profile/messages/${userEmail}`)
        ]);

        setUser(userRes.data);
        setBookings(bookingRes.data);
        setHasMessaged(messageRes.data.hasMessaged);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again later.");
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  if (loading) {
    return (
      <LoadingContainer>
        <PulseLoader color="#667eea" size={15} />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NoDataMessage>
          <h3>{error}</h3>
        </NoDataMessage>
      </ProfileContainer>
    );
  }

  if (!user) {
    return (
      <ProfileContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NoDataMessage>
          <h3>No user data found</h3>
          <p>Please check your connection or try again later</p>
        </NoDataMessage>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProfileHeader>
        <Avatar>
          <FiUser />
        </Avatar>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </ProfileHeader>

      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SectionTitle><FiUser /> Personal Information</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <FiMail />
            <div>
              <strong>Email:</strong> {user.email}
            </div>
          </InfoItem>
          <InfoItem>
            <FiPhone />
            <div>
              <strong>Phone:</strong> {user.mobile || 'Not provided'}
            </div>
          </InfoItem>
          <InfoItem>
            <FiHome />
            <div>
              <strong>Address:</strong> {user.address || 'Not provided'}
            </div>
          </InfoItem>
        </InfoGrid>
      </Section>

      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <SectionTitle><FiCalendar /> Bookings History</SectionTitle>
        {bookings.length === 0 ? (
          <NoDataMessage>No bookings found.</NoDataMessage>
        ) : (
          bookings.map((booking, index) => (
            <BookingCard
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <BookingDetail>
                <FiCalendar />
                <strong>Date:</strong> {new Date(booking.createdAt).toLocaleString()}
              </BookingDetail>
              <BookingDetail>
                <FiUser />
                <strong>Course:</strong> {booking.course}
              </BookingDetail>
              <BookingDetail>
                <FiDollarSign />
                <strong>Amount:</strong> ₹{booking.amount}
              </BookingDetail>
              {booking.phone && (
                <BookingDetail>
                  <FiPhone />
                  <strong>Phone:</strong> {booking.phone}
                </BookingDetail>
              )}
            </BookingCard>
          ))
        )}
      </Section>

      <Section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SectionTitle><FiMessageSquare /> Communication</SectionTitle>
        <MessageStatus hasMessaged={hasMessaged}>
          <FiMessageSquare />
          {hasMessaged ? "You have sent messages to admin" : "No messages sent yet"}
        </MessageStatus>
      </Section>
    </ProfileContainer>
  );
}

export default UserProfile;