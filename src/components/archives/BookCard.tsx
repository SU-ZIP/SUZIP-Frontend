import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dummy from "../../data/ContentData.json";

type Book = {
  itemId: number;
  name: string;
  content: string;
  image: string;
  genre: string;
  dType: string;
};

type BookCardProps = {
  book: Book;
};

const CardContainer = styled.div`
  width: 20vw;
  height: 60vh;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.25);
  position: relative;
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
  align-items: flex-start; // 왼쪽 정렬을 위해 변경
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  top: 0;
  &:hover {
    opacity: 1;
  }
`;

const BookInfoContent = styled.div`
  padding-left: 1vw; // 여기에 패딩을 적용
  padding-right: 1vw; // 우측 패딩도 적용하여 텍스트가 너무 끝까지 가지 않도록 함
  text-align: left;
`;

const BookTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.2rem;
  display: block;
  margin: 1vw;
  text-align: left; // 왼쪽 정렬
`;

const BookContent = styled.div`
  font-family: "Pretendard";
  font-weight: 100;
  font-size: 1rem;
  display: block;
  margin: 1vw;
  line-height: 170%;
  text-align: justify; // 왼쪽 정렬
`;

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (dummy && Array.isArray(dummy.serviceItem)) {
      setBooks(dummy.serviceItem);
    }
  }, []);

  return (
    <div>
      {books.map((book) => (
        <CardContainer key={book.itemId}>
          <BookCardContainer>
            <BookImage src={book.image} alt={book.name} />
            <BookInfo>
              <BookInfoContent>
                <BookTitle>{book.name}</BookTitle>
                <BookContent>{book.content}</BookContent>
              </BookInfoContent>
            </BookInfo>
          </BookCardContainer>
        </CardContainer>
      ))}
    </div>
  );
};

export default BookCard;
