import React from "react";
import styled from "styled-components";

type Music = {
  itemId: number;
  name: string;
  image: string;
  genre: string;
  dType: string;
};

type MusicCardProps = {
  music: Music;
  isActive?: boolean;
};

const CardContainer = styled.div<{ $isActive: boolean }>`
  width: ${(props) => (props.$isActive ? "25vw" : "20vw")};
  height: ${(props) => (props.$isActive ? "25vw" : "20vw")};
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  transition:
    width 0.3s ease-in-out,
    height 0.3s ease-in-out;
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

const MusicCard: React.FC<MusicCardProps> = ({ music, isActive = false }) => {
  return (
    <CardContainer $isActive={isActive}>
      <MusicCardContainer>
        <MusicImage src={music.image} alt={music.name} />
        <MusicInfo>
          <MusicInfoContent>
            <MusicTitle>{music.name}</MusicTitle>
          </MusicInfoContent>
        </MusicInfo>
      </MusicCardContainer>
    </CardContainer>
  );
};

export default MusicCard;
