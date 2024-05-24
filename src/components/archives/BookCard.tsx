import React from "react";
import styled from "styled-components";
import Dots from "../../assets/images/dot_white.png";

type Book = {
  itemId: number;
  name: string;
  image: string;
  genre: string;
  dType: string;
  emotion: string;
};

type BookCardProps = {
  book: Book;
  isActive?: boolean;
};

const emotionTextMap: { [key: string]: string } = {
  HAPPY: "기쁨",
  ANGER: "분노",
  SADNESS: "슬픔",
  NERVOUS: "긴장",
  HURT: "상처",
};

const emotionColorMap: { [key: string]: string } = {
  HAPPY: "linear-gradient(45deg, #96fbc4 0%, #f9f586 100%)",
  ANGER: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  SADNESS: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  NERVOUS: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  HURT: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const CardContainer = styled.div<{ isActive: boolean }>`
  width: ${(props) => (props.isActive ? "35vw" : "30vw")};
  height: ${(props) => (props.isActive ? "55vh" : "50vh")};
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  transition:
    width 0.3s ease-in-out,
    height 0.3s ease-in-out;
`;

const BookCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-position: center;
`;

const BookInfo = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  top: 0;
  &:hover {
    opacity: 1;
  }
`;

const BookInfoContent = styled.div`
  padding: 0 1vw 2.5vw 1vw;
  text-align: left;
`;

const EmotionCircle = styled.div<{ bgColor: string }>`
  width: 1.3vw;
  height: 1.3vw;
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  margin: 1vw;
`;

const BookTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.35rem;
  display: block;
  margin-left: 1vw;
  text-align: left;
`;

const BookContent = styled.div`
  font-family: "Pretendard";
  font-weight: 100;
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-top: 0.2vh;
  margin-left: 1vw;
  line-height: 170%;
  text-align: justify;
`;

const Dot = styled.img`
  width: 0.27vw;
  height: auto;
  margin: 0 0.4vw 0 0.4vw;
  display: flex;
`;

const BookCard: React.FC<BookCardProps> = ({ book, isActive = false }) => {
  return (
    <CardContainer isActive={isActive}>
      <BookCardContainer>
        <BookImage src={book.image} alt={book.name} />
        <BookInfo>
          <BookInfoContent>
            <EmotionCircle bgColor={emotionColorMap[book.emotion] || "gray"} />
            <BookTitle>{book.name}</BookTitle>
            <BookContent>
              {emotionTextMap[book.emotion] || book.emotion}
              <Dot src={Dots} />
              {book.genre}
            </BookContent>
          </BookInfoContent>
        </BookInfo>
      </BookCardContainer>
    </CardContainer>
  );
};

export default BookCard;
