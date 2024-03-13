import React from "react";
import styled from "styled-components";
import More from "../../assets/images/more_gray.png";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";

const ArchiveContainer = styled.div`
  padding: 10vh 0 7vh 0;
`;

const TextArea = styled.div`
  margin: 0 7vw 0 7vw;
`;

const TitleText = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 1.3rem;
  font-weight: normal;
`;

const DescriptionText = styled.div`
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: normal;
  color: #555555;
`;

const ButtonOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  margin: 0 1vw 0 1vw;
  z-index: 1;
`;

const Buttons = styled.img`
  width: 3vw;
  height: auto;
`;

const MoreButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MoreButton = styled.img`
  width: 3vw;
  height: auto;
`;

const BookRecommendContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  background: blue;
  margin: 10vh 0 20vh 0;

  text-align: center;
`;

function BookRecommendation() {
  return (
    <ArchiveContainer>
      <TextArea>
        <TitleText>BOOK RECOMMENDATION</TitleText>
        <DescriptionText>
          지금까지 받은 책 추천 목록을 최신순으로 보여드려요
        </DescriptionText>
      </TextArea>
      <BookRecommendContainer>
        <ButtonOverlay>
          <Buttons src={Left} />
          <Buttons src={Right} />
        </ButtonOverlay>
      </BookRecommendContainer>
      <MoreButtonContainer>
        <MoreButton src={More} />
      </MoreButtonContainer>
    </ArchiveContainer>
  );
}

export default BookRecommendation;
