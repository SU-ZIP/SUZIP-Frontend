import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/sz.png";
import MenuIcon from "../../assets/images/menu.png";
import IndexPage from "../../pages/IndexPage";
import { useAuth } from '../auth/AuthContext';

const HeaderContainer = styled.div`
  height: 10vh;
  padding: 4vh 3vw 0.5vh 3vw;
`;

const IconsContainer = styled.div`
  padding: 0 0.51vw 0 0.5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 2.5vw;
  height: auto;
`;

const Menu = styled.img`
  width: 1.5vw;
  height: auto;
  cursor: pointer;
`;

const UserName = styled.div`
  font-size: 1.3rem;
  margin-right: 1vw;
  display: flex;
  align-items: center;
`;

const UserNameText = styled.span`
  font-weight: 600; 
`;

const UserSuffix = styled.span`
  margin-left: 0.2vw;
  font-weight: 400; 
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-bottom: 0.1vh solid black;
  margin-top: 2vh;
`;

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const { userName, isLoggedIn } = useAuth();
  
  return (
    <HeaderContainer>
      <IconsContainer>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <RightContainer>
          {isLoggedIn && userName && (
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
