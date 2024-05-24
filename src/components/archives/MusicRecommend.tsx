import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Swiper as SwiperClass } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styled from "styled-components";
import MusicCard from "./MusicCard";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";

import axios from "axios";
import config from "../../assets/path/config";
import { MusicRecommendation } from "../../types";

interface MusicCardProps {
  musicData: MusicRecommendation;
}

type Music = {
  itemId: number;
  name: string;
  image: string;
  artist: string;
  dType: string;
  emotion: string;
};

const ArchiveContainer = styled.div`
  height: calc(100vh - 20vh);
  margin-top: 7vh;
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

const MusicRecommendContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 10vh 0 20vh 0;
  text-align: center;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MusicRecommend() {
  const { musicId } = useParams<{ musicId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { musicData } = location.state || {};
  const [musics, setMusics] = useState<Music[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(2);

  useEffect(() => {
    if (musicData) {
      setMusics(musicData);
    } else {
      const fetchMusics = async () => {
        try {
          const response = await axios.get(
            `${config.API_URL}/api/contents/musics`,
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
            const fetchedMusics = response.data.result.musicList.map(
              (music: any) => ({
                itemId: music.musicId,
                name: music.name,
                image: music.image,
                artist: music.artist,
                dType: "music",
                emotion: music.emotion,
              })
            );
            setMusics(fetchedMusics);
          } else {
            console.error("Failed to fetch musics: ", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching musics: ", error);
        }
      };

      fetchMusics();
    }
  }, [musicData, musicId, navigate]);

  return (
    <ArchiveContainer>
      <TextArea>
        <TitleText>MUSIC RECOMMENDATION</TitleText>
        <DescriptionText>
          지금까지 받은 음악 추천 목록을 최신순으로 보여드려요
        </DescriptionText>
      </TextArea>
      <MusicRecommendContainer>
        <Swiper
          slidesPerView={5} // 첫 화면에 5개의 음악이 보이도록 설정
          centeredSlides={true}
          spaceBetween={30} // 카드들 사이의 간격 설정
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
          {musics.map((music, index) => (
            <StyledSwiperSlide key={music.itemId}>
              <MusicCard music={music} isActive={index === activeIndex} />
            </StyledSwiperSlide>
          ))}
        </Swiper>
      </MusicRecommendContainer>
    </ArchiveContainer>
  );
}

export default MusicRecommend;
