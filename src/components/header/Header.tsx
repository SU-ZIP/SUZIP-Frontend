import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from 'axios';
import Logo from "../../assets/images/sz.png";
import MenuIcon from "../../assets/images/menu.png";
import IndexPage from "../../pages/IndexPage";
import { useAuth } from '../auth/AuthContext'; // 경로에 따라 수정하세요

const HeaderContainer = styled.div`
  height: 10vh;
  padding: 4vh 3vw 0.5vh 3vw;
`;

const IconsContainer = styled.div`
  padding: 0 1vw 0 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 3.5vw;
  height: auto;
`;

const Menu = styled.img`
  width: 2vw;
  height: auto;
  cursor: pointer;
`;

const UserName = styled.div`
  font-size: 1.1rem;
  margin-right: 1vw;
  display: flex;
  align-items: center;
`;

const UserNameText = styled.span`
  font-weight: 600;  // 이름의 굵기
`;

const UserSuffix = styled.span`
  margin-left: 0.2vw;
  font-weight: 400;  // '님'의 굵기
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-bottom: 0.1vh solid black;
  margin-top: 2vh;
`;

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { userName, isLoggedIn } = useAuth(); // AuthContext에서 상태를 사용

  return (
    <HeaderContainer>
      <IconsContainer>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <RightContainer>
          {isLoggedIn && userName && ( // 로그인 상태와 사용자 이름이 유효할 때만 표시
            <UserName>
              <UserNameText>{userName}</UserNameText>
              <UserSuffix> 님</UserSuffix>
            </UserName>
          )}
          <Menu
            src={MenuIcon}
            onClick={() => setModalOpen(true)}
          />
        </RightContainer>
        {modalOpen && <IndexPage onClose={() => setModalOpen(false)} />}
      </IconsContainer>
      <HorizontalLine />
    </HeaderContainer>
  );
}

export default Header;
