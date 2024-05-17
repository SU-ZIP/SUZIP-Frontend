import React, { useState, useEffect, forwardRef } from "react";
import { Swiper as SwiperClass } from "swiper/types"; // Swiper의 타입을 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import More from "../../assets/images/more_gray.png";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";
import BookCard from "./BookCard";
import dummy from "../../data/ContentData.json";

type Book = {
  itemId: number;
  name: string;
  image: string;
  genre: string;
  dType: "book";
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

/*
const ButtonOverlay = styled.div`
position: absolute;
top: 50%;
left: 0;
right: 0;
transform: translateY(-50%);
display: flex;
justify-content: space-between;
margin: 0 1vw 0 1vw;
z-index: 10;
`;

const Buttons = styled.img`
  width: 3vw;
  height: auto;
`;
*/

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

const BookRecommendation = forwardRef(
  ({ scrollToMovie }: { scrollToMovie: () => void }, ref) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(2);

    useEffect(() => {
      const filteredBooks = dummy.serviceItem.filter(
        (item) => item.dType === "book"
      );
      setBooks(filteredBooks as Book[]);
    }, []);

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

          {/*
          <ButtonOverlay>
            <Buttons src={Left} className="swiper-button-prev" />
            <Buttons src={Right} className="swiper-button-next" />
          </ButtonOverlay>
          **/}
        </BookRecommendContainer>
      </ArchiveContainer>
    );
  }
);

export default BookRecommendation;
