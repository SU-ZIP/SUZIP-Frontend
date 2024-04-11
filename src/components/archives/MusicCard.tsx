import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dummy from "../../data/ContentData.json";

type Music = {
  itemId: number;
  name: string;
  content: string;
  image: string;
  genre: string;
  dType: string;
};

type MusicCardProps = {
  music: Music;
};

const CardContainer = styled.div`
  width: 10vw;
  height: 10vw;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const MusicCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MusicImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-position: center;
`;

const MusicInfo = styled.div`
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

const MusicInfoContent = styled.div`
  padding-left: 1vw;
  padding-right: 1vw;
  text-align: left;
`;

const MusicTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.2rem;
  display: block;
  margin: 1vw;
  text-align: left;
`;

const MusicContent = styled.div`
  font-family: "Pretendard";
  font-weight: 100;
  font-size: 1rem;
  display: block;
  margin: 1vw;
  line-height: 170%;
  text-align: justify;
`;

const MusicCard: React.FC<MusicCardProps> = ({ music }) => {
  const [musics, setMusics] = useState<Music[]>([]);

  useEffect(() => {
    if (dummy && Array.isArray(dummy.serviceItem)) {
      setMusics(dummy.serviceItem);
    }
  }, []);

  return (
    <div>
      {musics.map((music) => (
        <CardContainer key={music.itemId}>
          <MusicCardContainer>
            <MusicImage src={music.image} alt={music.name} />
            <MusicInfo>
              <MusicInfoContent>
                <MusicTitle>{music.name}</MusicTitle>
                <MusicContent>{music.content}</MusicContent>
              </MusicInfoContent>
            </MusicInfo>
          </MusicCardContainer>
        </CardContainer>
      ))}
    </div>
  );
};

export default MusicCard;
