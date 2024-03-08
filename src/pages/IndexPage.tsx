import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import closeButton from "../assets/images/close.png";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div<{ backgroundColor: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: ${({ backgroundColor }) => backgroundColor};
  transition: background 3s ease-in-out;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15vw;
  margin-right: 15vw;
`;

const IndexMenu = styled.div`
  margin-bottom: 1.5vh;
`;

const PagingMenu = styled.div`
  display: flex;
`;

const IndexItem = styled(Link)`
  text-decoration: none;
  font-family: "PPMonumentExtended";
  font-size: 3.2rem;
  font-weight: light;
  color: #ffffff;
  margin: 2vh;
  display: block;
`;

const PagingItem = styled(Link)`
  text-decoration: none;
  font-family: "PPMonumentExtended";
  font-size: 1.5rem;
  font-weight: light;
  color: #ffffff;
  margin: 3vh 2vw 0 2vh;
  white-space: nowrap;
`;

const CloseBTN = styled.img`
  width: 1.5vw;
  height: auto;
  background: transparent;
  text-align: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10vh;
  margin-right: 10vw;
  margin-bottom: 3vh;
  cursor: pointer;
`;

interface IndexPageProps {
  onClose: () => void;
}

function IndexPage({ onClose }: IndexPageProps) {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    const colors = [
      "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
      "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(0deg, #96fbc4 0%, #f9f586 100%)",
    ];

    setBackgroundColor(colors[0]);

    let currentIndex = 1;

    const interval = setInterval(() => {
      if (!document.hidden) {
        setBackgroundColor(colors[currentIndex]);
        currentIndex = (currentIndex + 1) % colors.length;
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ModalOverlay>
      <ModalContainer backgroundColor={backgroundColor}>
        <CloseBTN src={closeButton} onClick={onClose} />
        <MenuContainer>
          <IndexMenu>
            <IndexItem to="/">Home</IndexItem>
            <IndexItem to="/about">About</IndexItem>
            <IndexItem to="/archives">Archives</IndexItem>
            <IndexItem to="/services">Services</IndexItem>
            <IndexItem to="/my">My</IndexItem>
          </IndexMenu>
          <PagingMenu>
            <PagingItem to="/login">LOGIN</PagingItem>
            <PagingItem to="/signup">SIGN UP</PagingItem>
          </PagingMenu>
        </MenuContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default IndexPage;
