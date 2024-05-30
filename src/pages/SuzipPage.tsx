import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import frame2 from "../assets/images/frame2.png";
import shuffle from "../assets/images/shuffle.png";
import config from "../assets/path/config";

const PageContainer = styled.div`
  height: 300vh; 
  background-color: #fff;
  position: relative;
`;

const Frame1Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  z-index: 2;
`;

const TitleContainer = styled.div`
  position: fixed;
  top: 70px; /* Frame1 아래에 위치 */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  text-align: center;
  color: black;
  z-index: 2;
`;

const MainTitle = styled.h1`
  font-family: "PPMonumentExtended";
  font-size: 4em;
  font-weight: bold;
  text-align: left;
  margin-left: 8vw;
  display: flex;
  align-items: center;
`;

const ShuffleButton = styled.img`
  width: 35px;
  height: 35px;
  margin-top: 15px;
  margin-left: 20px;
  cursor: pointer;
`;

const SubTitle = styled.div`
  display: flex;
  font-family: "PPMonumentExtended";
  justify-content: flex-end;
  align-items: center;
  margin-right: 3vw;
  text-align: right;
`;

const BoldText = styled.span`
  font-weight: 300;
`;

const LightText = styled.span`
  font-weight: 200;
`;

const Frame2Container = styled.div<{ translateY: number }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-image: url(${frame2});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transform: translateY(${(props) => props.translateY}px);
  transition: transform 0.3s;
`;

const ContentContainer = styled.div`
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  padding: 20px;
  z-index: 1;
`;

const StyledImage = styled.img`
  width: 100%;
  max-height: 60vh;
  object-fit: contain; 
`;

const TitleDateContainer = styled.div<{ imageWidth: number }>`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: ${(props) => props.imageWidth}px;
`;

const Title = styled.p`
  font-family: "Pretendard";
  font-size: 1.2em;
  margin: 0;
`;

const DateText = styled.p`
  font-family: "Pretendard";
  font-size: 1.1em;
  margin: 0;
`;

const NoImageText = styled.div`
  font-size: 24px;
  color: #bbb;
  text-align: center;
`;

const SuzipPage: React.FC = () => {
  const [diaryImage, setDiaryImage] = useState("");
  const [diaryDate, setDiaryDate] = useState("");
  const [diaryTitle, setDiaryTitle] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const fetchDiaryData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const response = await axios.get(`${config.API_URL}/api/emotions/happy`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const diary = response.data.result;
      console.log("Fetched diary:", diary);
      if (diary) {
        setDiaryImage(diary.image || "");
        setDiaryDate(diary.date);
        setDiaryTitle(diary.title);
      } else {
        setDiaryImage("");
        setDiaryDate("No diary available");
        setDiaryTitle("No title available");
      }
    } catch (error) {
      console.error("Error fetching diary data", error);
      setDiaryImage("");
      setDiaryDate("Error fetching data");
      setDiaryTitle("Error fetching data");
    }
  };

  useEffect(() => {
    fetchDiaryData();
  }, []);

  useEffect(() => {
    console.log("diaryImage:", diaryImage);
    console.log("diaryDate:", diaryDate);
    console.log("diaryTitle:", diaryTitle);
  }, [diaryImage, diaryDate, diaryTitle]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageWidth(e.currentTarget.offsetWidth);
  };

  return (
    <PageContainer>
      <Frame1Container />
      <TitleContainer>
        <MainTitle>
          Happy
          <ShuffleButton src={shuffle} alt="Shuffle" onClick={fetchDiaryData} />
        </MainTitle>
        <SubTitle>
          <BoldText>Collection</BoldText>
          <LightText>&nbsp;of&nbsp;</LightText>
          <BoldText>Happiness</BoldText>
        </SubTitle>
      </TitleContainer>
      <Frame2Container translateY={scrollY / 2} />
      <ContentContainer>
        {diaryImage ? (
          <>
            <StyledImage src={diaryImage} alt="Diary Image" onLoad={handleImageLoad} />
            <TitleDateContainer imageWidth={imageWidth}>
              <Title>{diaryTitle}</Title>
              <DateText>{diaryDate}</DateText>
            </TitleDateContainer>
          </>
        ) : (
          <>
            <NoImageText>No Image</NoImageText>
            <TitleDateContainer imageWidth={imageWidth}>
              <Title>{diaryTitle}</Title>
              <DateText>{diaryDate}</DateText>
            </TitleDateContainer>
          </>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default SuzipPage;
