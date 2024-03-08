import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/sz.png";
import MenuIcon from "../../assets/images/menu.png";
import IndexPage from "../../pages/IndexPage";

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
  cursor: pointer;
`;

const HorizontalLine = styled.div`
  width: 100%;
  border-bottom: 0.1vh solid black;
  margin-top: 2vh;
`;

function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <HeaderContainer>
      <IconsContainer>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <Menu
          src={MenuIcon}
          onClick={() => {
            setModalOpen(true);
          }}
        />
        {modalOpen && <IndexPage onClose={() => setModalOpen(false)} />}
      </IconsContainer>
      <HorizontalLine />
    </HeaderContainer>
  );
}

export default Header;
