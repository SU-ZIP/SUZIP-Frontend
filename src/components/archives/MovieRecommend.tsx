import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import styled from "styled-components";
import MovieCard from "./MovieCard";
import dummy from "../../data/ContentData.json";
import More from "../../assets/images/more_white.png";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";

type Movie = {
  itemId: number;
  name: string;
  content: string;
  image: string;
  genre: string;
  dType: string;
};

const ArchiveContainer = styled.div`
  padding: 25vh 0 7vh 0;
  background: black;
`;

const TextArea = styled.div`
  margin: 0 7vw 0 7vw;
  color: white;
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

const MovieRecommendContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40vh;
  background: blue;
  margin: 10vh 0 30vh 0;
`;

function MovieRecommend() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const filteredMovies = dummy.serviceItem.filter(
      (item) => item.dType === "movie"
    );
    setMovies(filteredMovies as Movie[]);
  }, []);

  return (
   <ArchiveContainer>
      <TextArea>
        <TitleText>MOVIE RECOMMENDATION</TitleText>
        <DescriptionText>
          지금까지 받은 영화 추천 목록을 최신순으로 보여드려요
        </DescriptionText>
      </TextArea>
      <MovieRecommendContainer>
        <Swiper
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={100}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.itemId}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ButtonOverlay>
          <Buttons src={Left} alt="Previous" />
          <Buttons src={Right} alt="Next" />
        </ButtonOverlay>
      </MovieRecommendContainer>
      <MoreButtonContainer>
        <MoreButton src={More} alt="More" />
      </MoreButtonContainer>
    </ArchiveContainer>
  );
}

export default MovieRecommend;
