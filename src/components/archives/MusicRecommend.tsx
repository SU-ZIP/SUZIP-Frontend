import React, { useState, useEffect } from "react";
import { Swiper as SwiperClass } from "swiper/types"; // Swiper의 타입을 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import MusicCard from "./MusicCard";
import dummy from "../../data/ContentData.json";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";

type Music = {
  itemId: number;
  name: string;
  image: string;
  genre: string;
  dType: string;
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
  const [musics, setMusics] = useState<Music[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(2); // 가운데 음악의 인덱스 설정

  useEffect(() => {
    const filteredMusics = dummy.serviceItem.filter(
      (item) => item.dType === "music"
    );
    setMusics(filteredMusics as Music[]);
  }, []);

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
