import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import frame2 from "../assets/images/frame2.png";
import shuffle from "../assets/images/shuffle.png";
import backButton from "../assets/images/left_white.png";
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
  height: 6vh;
  padding-left: 2vw;
  background-color: black;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  z-index: 2;
`;

const BackButton = styled.img`
  width: 1.2vw;
  height: auto;
  cursor: pointer;
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
  margin-top: 80px;
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
  margin-top: -100px;
`;

const BoldText = styled.span`
  font-weight: 200;
`;

const LightText = styled.span`
  font-weight: 100;
`;

const Frame2Container = styled.div<{ translateY: number }>`
  position: fixed;
  top: 50%;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  padding: 20px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const StyledImage = styled.img`
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
`;

const TitleDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  margin-bottom: 2vh;
`;

const Title = styled.p`
  font-family: "Pretendard";
  font-size: 1.3em;
  margin: 0;
  text-align: center;
  font-weight: 500;
`;

const DateText = styled.p`
  font-family: "Pretendard";
  font-size: 1.1em;
  margin: 0;
  text-align: center;
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
  const navigate = useNavigate(); // useNavigate 훅 사용

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

  return (
    <PageContainer>
      <Frame1Container>
        <BackButton src={backButton} onClick={() => navigate("/my")} />{" "}
        {/* navigate 사용 */}
      </Frame1Container>
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
            <TitleDateContainer>
              <Title>{diaryTitle}</Title>
              <DateText>{diaryDate}</DateText>
            </TitleDateContainer>
            <StyledImage src={diaryImage} alt="Diary Image" />
          </>
        ) : (
          <>
            <NoImageText>No Image</NoImageText>
            <TitleDateContainer>
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
