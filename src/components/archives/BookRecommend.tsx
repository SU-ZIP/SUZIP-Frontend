import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styled from "styled-components";
import BookCard from "./BookCard";
import More from "../../assets/images/more_gray.png";

import axios from "axios";
import config from "../../assets/path/config";
import { BookRecommendation } from "../../types";

interface BookCardProps {
  bookData: BookRecommendation;
}

type Book = {
  itemId: number;
  name: string;
  image: string;
  genre: string;
  dType: "book";
  emotion: string;
};

const ArchiveContainer = styled.div`
  height: calc(100vh - 20vh);
  padding: 2vh 0 7vh 0;
`;

const TextArea = styled.div`
  margin: 0 7vw 0 7vw;
`;

const TitleText = styled.div`
  font-family: "PPMonumentExtended";
  font-size: 1.3rem;
  font-weight: 200;
`;

const DescriptionText = styled.div`
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: normal;
  color: #555555;
`;

const MoreButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5vh 0 10vh 0;
`;

const MoreButton = styled.img`
  width: 3vw;
  height: auto;
  cursor: pointer;
`;

const BookRecommendContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 10vh 0 30vh 0;
  text-align: center;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookRecommend: React.FC<{ scrollToMovie: () => void }> = ({
  scrollToMovie,
}) => {
  const { bookId } = useParams<{ bookId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookData } = location.state || {};
  const [books, setBooks] = useState<Book[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(2);

  useEffect(() => {
    if (bookData) {
      setBooks(bookData);
    } else {
      const fetchBooks = async () => {
        try {
          const response = await axios.get(
            `${config.API_URL}/api/contents/books`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              params: {
                page: 0, // 필요한 경우 적절한 페이지 번호를 설정
                size: 10, // 필요한 경우 적절한 페이지 크기를 설정
              },
            }
          );
          if (response.data.isSuccess) {
            const fetchedBooks = response.data.result.bookList.map(
              (book: any) => ({
                itemId: book.bookId,
                name: book.name,
                image: book.image,
                genre: book.genre,
                dType: "book",
                emotion: book.emotion,
              })
            );
            setBooks(fetchedBooks);
          } else {
            console.error("Failed to fetch books: ", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching books: ", error);
        }
      };

      fetchBooks();
    }
  }, [bookData, bookId, navigate]);

  return (
    <ArchiveContainer>
      <TextArea>
        <TitleText>BOOK RECOMMENDATION</TitleText>
        <DescriptionText>
          지금까지 받은 책 추천 목록을 최신순으로 보여드려요
        </DescriptionText>
      </TextArea>
      <BookRecommendContainer>
        <Swiper
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          onSlideChange={(swiper: SwiperClass) =>
            setActiveIndex(swiper.activeIndex)
          }
        >
          {books.map((book, index) => (
            <StyledSwiperSlide key={book.itemId}>
              <BookCard book={book} isActive={index === activeIndex} />
            </StyledSwiperSlide>
          ))}
        </Swiper>
        <MoreButtonContainer>
          <MoreButton src={More} alt="More" onClick={scrollToMovie} />
        </MoreButtonContainer>
      </BookRecommendContainer>
    </ArchiveContainer>
  );
};

export default BookRecommend;
