import React from "react";
import styled from "styled-components";

const TypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333333;
`;

const BoldText = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 6.5rem;
  font-weight: normal;
`;

const ThinText = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 5rem;
  font-weight: light;
`;

function TitleTypo() {
  return (
    <TypoContainer>
      <BoldText>Su.Zip</BoldText>
      <ThinText>your</ThinText>
    </TypoContainer>
  );
}

export default TitleTypo;
