import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
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
  font-weight: 200;
  color: #ffffff;
  margin: 2vh;
  display: block;
`;

const PagingItem = styled.a`
  text-decoration: none;
  font-family: "PPMonumentExtended";
  font-size: 1.5rem;
  font-weight: 200;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 로그인 상태를 확인
    axios.get("http://localhost:8080/api/auth/status", { withCredentials: true })
      .then(response => {
        setIsLoggedIn(response.data.success && response.data.data != null);
      })
      .catch(error => {
        console.error("로그인 상태 확인 실패:", error);
        setIsLoggedIn(false);
      });

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

  const handleLogout = () => {
    axios.post("http://localhost:8080/api/token/logout", {}, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then(response => {
        console.log("로그아웃 되었습니다.");
        setIsLoggedIn(false); // 로그인 상태 업데이트
        localStorage.removeItem("accessToken"); // 로컬 스토리지에서 토큰 제거
        onClose(); // 메뉴 닫기
        navigate('/'); // 홈으로 리디렉션
      })
      .catch(error => {
        console.error("로그아웃 실패:", error);
      });
  };
  
  return (
    <ModalOverlay>
      <ModalContainer backgroundColor={backgroundColor}>
        <CloseBTN src={closeButton} onClick={onClose} />
        <MenuContainer>
          <IndexMenu>
            <IndexItem to="/" onClick={onClose}>
              Home
            </IndexItem>
            <IndexItem to="/about" onClick={onClose}>
              About
            </IndexItem>
            <IndexItem to="/archives" onClick={onClose}>
              Archives
            </IndexItem>
            <IndexItem to="/services" onClick={onClose}>
              Services
            </IndexItem>
            <IndexItem to="/my" onClick={onClose}>
              My
            </IndexItem>
            </IndexMenu>
          <PagingMenu>
            {isLoggedIn ? (
              <PagingItem as="div" onClick={handleLogout}>
                LOGOUT
              </PagingItem>
            ) : (
              <PagingItem href="http://localhost:8080/api/login" onClick={onClose}>
                LOGIN
              </PagingItem>
            )}
            <PagingItem href="http://localhost:8080/signup" onClick={onClose}>
              SIGN UP
            </PagingItem>
          </PagingMenu>
        </MenuContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default IndexPage;

