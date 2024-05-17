import React from "react";
import styled from "styled-components";

type Book = {
  itemId: number;
  name: string;
  image: string;
  genre: string;
  dType: string;
};

type BookCardProps = {
  book: Book;
  isActive?: boolean;
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
  justify-content: center;
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
  padding-left: 1vw;
  padding-right: 1vw;
  text-align: left;
`;

const BookTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.2rem;
  display: block;
  margin: 1vw;
  text-align: left;
`;

const BookCard: React.FC<BookCardProps> = ({ book, isActive = false }) => {
  return (
    <CardContainer isActive={isActive}>
      <BookCardContainer>
        <BookImage src={book.image} alt={book.name} />
        <BookInfo>
          <BookInfoContent>
            <BookTitle>{book.name}</BookTitle>
          </BookInfoContent>
        </BookInfo>
      </BookCardContainer>
    </CardContainer>
  );
};

export default BookCard;
