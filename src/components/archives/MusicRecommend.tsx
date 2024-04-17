import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import styled from "styled-components";
import MusicCard from "./MusicCard";
import dummy from "../../data/ContentData.json";
import Left from "../../assets/images/left.png";
import Right from "../../assets/images/right.png";

type Music = {
  itemId: number;
  name: string;
  content: string;
  image: string;
  genre: string;
  dType: string;
};

const ArchiveContainer = styled.div`
  padding: 25vh 0 7vh 0;
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

const MusicRecommendContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  background: blue;
  margin: 10vh 0 20vh 0;
`;

function MusicRecommend() {
  const [musics, setMusics] = useState<Music[]>([]);

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
          slidesPerView={5}
          centeredSlides={true}
          spaceBetween={10}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {musics.map((music) => (
            <SwiperSlide key={music.itemId}>
              <MusicCard music={music} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ButtonOverlay>
          <Buttons src={Left} alt="Previous" />
          <Buttons src={Right} alt="Next" />
        </ButtonOverlay>
      </MusicRecommendContainer>
    </ArchiveContainer>
  );
}

export default MusicRecommend;
