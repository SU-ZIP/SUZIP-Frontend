import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/sz.png";
import MenuIcon from "../../assets/images/menu.png";

const HeaderContainer = styled.div`
  height: 10vh;
  padding: 4vh 3vw 0.5vh 3vw;
`;

const IconsContainer = styled.div`
  padding: 0 1vw 0 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 4.5vw;
  height: auto;
`;

const Menu = styled.img`
  width: 3vw;
  height: auto;
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-bottom: 0.1vh solid black;
  margin-top: 2vh;
`;

function Header() {
  return (
    <HeaderContainer>
      <IconsContainer>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <Link to="/index">
          <Menu src={MenuIcon} />
        </Link>
      </IconsContainer>
      <HorizontalLine />
    </HeaderContainer>
  );
}

export default Header;
