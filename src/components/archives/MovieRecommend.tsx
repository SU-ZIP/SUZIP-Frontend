import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styled from "styled-components";
import MovieCard from "./MovieCard";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";
import More from "../../assets/images/more_white.png";

import axios from "axios";
import config from "../../assets/path/config";
import { MovieRecommendation } from "../../types";

interface MovieCardProps {
  movieData: MovieRecommendation;
}

type Movie = {
  itemId: number;
  name: string;
  content: string;
  image: string;
  genre: string;
  dType: string;
  emotion: string;
};

const ArchiveContainer = styled.div`
  padding: 10vh 0 7vh 0;
  background: black;
`;

const TextArea = styled.div`
  margin: 0 7vw 0 7vw;
  color: white;
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
  cursor: pointer;
`;

const MovieRecommendContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 10vh 0 0 0;
  text-align: center;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MovieRecommend: React.FC<{ scrollToMusic: () => void }> = ({
  scrollToMusic,
}) => {
  const { movieId } = useParams<{ movieId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { movieData } = location.state || {};
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(2);

  useEffect(() => {
    if (movieData) {
      setMovies(movieData);
    } else {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `${config.API_URL}/api/contents/movies`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              params: {
                page: 0,
                size: 5,
                sort: "createdAt,desc",
              },
            }
          );
          if (response.data.isSuccess) {
            const fetchedMovies = response.data.result.movieList.map(
              (movie: any) => ({
                itemId: movie.movieId,
                name: movie.name,
                image: movie.image,
                genre: movie.genre,
                dType: "movie",
                emotion: movie.emotion,
              })
            );
            setMovies(fetchedMovies);
          } else {
            console.error("Failed to fetch movies: ", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching movies: ", error);
        }
      };

      fetchMovies();
    }
  }, [movieData, movieId, navigate]);

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
          {movies.map((movie, index) => (
            <StyledSwiperSlide key={movie.itemId}>
              <MovieCard movie={movie} isActive={index === activeIndex} />
            </StyledSwiperSlide>
          ))}
        </Swiper>
      </MovieRecommendContainer>
      <MoreButtonContainer>
        <MoreButton src={More} alt="More" onClick={scrollToMusic} />
      </MoreButtonContainer>
    </ArchiveContainer>
  );
};

export default MovieRecommend;
