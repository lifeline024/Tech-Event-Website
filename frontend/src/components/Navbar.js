import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaHome, FaCalendarAlt, FaUserShield, FaBars, FaTimes } from "react-icons/fa";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const NavContainer = styled.nav`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 1rem 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    animation: ${pulse} 1s ease infinite;
    color: #ffb703;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
`;

const NavLink = styled(Link)`
  color: ${({ $isActive }) => ($isActive ? "#ffb703" : "rgba(255, 255, 255, 0.9)")};
  text-decoration: none;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "500")};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: ${({ $isActive }) => ($isActive ? "80%" : "0")};
    height: 2px;
    background: #ffb703;
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #ffb703;
    transform: translateY(-2px);

    &::after {
      width: 80%;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 0.8rem;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  transition: all 0.3s ease;

  &:hover {
    color: #ffb703;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">
          TechFest
        </Logo>

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavLinks $isOpen={isMenuOpen}>
          <NavLink 
            to="/" 
            $isActive={location.pathname === "/"}
          >
            <FaHome /> Home
          </NavLink>
          <NavLink 
            to="/events" 
            $isActive={location.pathname === "/events"}
          >
            <FaCalendarAlt /> Events
          </NavLink>
          <NavLink 
            to="/admin" 
            $isActive={location.pathname === "/admin"}
          >
            <FaUserShield /> Admin
          </NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
}

export default Navbar;