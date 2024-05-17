import React from "react";
import styled from "styled-components";

const BoxContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const BackImage = styled.div`
  width: 70vw;
  height: 80vh;
  background: gray;
  border-radius: 1vw;
  z-index: 1;
  box-shadow: 0.1vw 1vw 2vw 0.1vw lightgray;
`;

const FrontImage = styled.div`
  width: 35vw;
  height: 90vh;
  background: lightgray;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  z-index: 2;
  box-shadow: 0.1vw 1vw 2vw 0.1vw lightgray;
`;

function ServiceImageBox() {
  return (
    <BoxContainer>
      <BackImage />
      <FrontImage />
    </BoxContainer>
  );
}

export default ServiceImageBox;
