import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Background image from Unsplash (college fest theme)
const backgroundImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298, #6a11cb);
  background-size: 300% 300%;
  animation: ${gradientBG} 12s ease infinite;
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${backgroundImage}) center/cover;
    opacity: 0.15;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 1s ease both;
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: fadeIn 1.5s ease both;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const EventList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 2rem 0;
  animation: fadeInUp 1.2s ease both;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.2rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const CTAButton = styled(Link)`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background-color: #ffb703;
  color: #1a1a2e;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 183, 3, 0.4);
  position: relative;
  overflow: hidden;
  z-index: 1;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 1s;
  border-radius: 50px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ffb703, #ffd166);
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: 1;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 183, 3, 0.6);
    
    &::before {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
`;

const FloatingElement = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  filter: blur(30px);
  animation: ${float} 6s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 20%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    width: 300px;
    height: 300px;
    bottom: 15%;
    right: 10%;
    animation-delay: 2s;
  }
  
  &:nth-child(3) {
    width: 150px;
    height: 150px;
    top: 60%;
    left: 5%;
    animation-delay: 4s;
  }
`;

function Home() {
  const events = [
  "Hackathon",
  "Project Expo",
  "Coding Challenge",
  "BGMI Tournament",
  "FREE FIRE Tournament",
  "Dance Competition",
  "Singing Contest",
  "Modeling Competition",
  "Video & Photography Contest",
  "Poster Presentation",
  "Treasure Hunt",
  "Weight Lifting Competition"
];


  return (
    <HeroSection>
      <FloatingElements>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
      </FloatingElements>
      
      <ContentWrapper>
        <Title>𝓒𝓸𝓶𝓹𝓾𝓽𝓮𝓻 𝓢𝓬𝓲𝓮𝓷𝓬𝓮 𝓣𝓮𝓬𝓱 𝓕𝓮𝓼𝓽 (2025)</Title>
        <Subtitle>
          Experience the ultimate college festival with 15+ electrifying events! 
          Showcase your talents, compete with the best, and create memories 
          that last a lifetime. From tech to arts, we've got it all!
        </Subtitle>
        
        <EventList>
          {events.map((event, index) => (
            <EventCard key={index}>{event}</EventCard>
          ))}
        </EventList>
        
        <CTAButton to="/events">Register Now</CTAButton>
      </ContentWrapper><br></br>
<p style={{
  fontWeight: "900",
  fontSize: "18px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  background: "linear-gradient(45deg, #ff6ec4, #7873f5, #4ade80)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "glow 2s ease-in-out infinite alternate",
  textAlign: "center",
  padding: "10px",
  userSelect: "none",
  letterSpacing: "1.2px"
}}>
  Design and Developed By ❤️ Aayushya Shrivastava
</p>

<style>
{`
  @keyframes glow {
    from {
      text-shadow: 0 0 10px #c76407ff, 0 0 20px #0bc524ff, 0 0 30px #ecebefff;
    }
    to {
      text-shadow: 0 0 20px #d6d6dfff, 0 0 30px #d6d6dfff, 0 0 40px #d6d6dfff;
    }
  }
`}
</style>
    </HeroSection>
  );
}

export default Home;
