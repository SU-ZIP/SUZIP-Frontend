import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import EditModal from "../components/modal/EditModal";
import DeleteModal from "../components/modal/DeleteModal";
import MenuImg from "../assets/images/diarymenu.png";
import GarbageImg from "../assets/images/garbage.png";
import GraphImg from "../assets/images/graph.png";
import PencilImg from "../assets/images/pencil.png";

import axios from "axios";
import { DiaryData } from "../types";
import config from "../assets/path/config";

const PageContainer = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 10vw;
  padding-bottom: 20vh;
`;

const DateContainer = styled.div`
  font-family: "Pretendard";
  display: flex;
  width: 100%;
  align-items: baseline;
  margin-bottom: 12px;
`;

const DateLabel = styled.span`
  font-size: 17px;
  color: #838383;
`;

const DateText = styled.span`
  font-size: 17px;
  color: #333333;
  margin-left: 24px;
`;

const DiaryTitle = styled.div`
  width: 100%;
  padding: 8px;
  margin-left: -5px;
  margin-bottom: 12px;
  border: none;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 48px;
  color: #333333;
  outline: none;
  text-align: left;
`;

const DiaryImage = styled.img`
  margin-top: 15px;
  margin-bottom: 10px;
  align-self: center;
  margin-top: 5vh;
  margin-bottom: 7vh;
  max-width: 50vw;
  max-height: 50vh;
`;

const ContentTextarea = styled.div`
  font-family: "Pretendard";
  outline: none;
  width: 100%;
  height: auto;
  padding: 8px;
  line-height: 25px;
  font-size: 18px;
  color: #2d2d2d;
  white-space: pre-wrap;
`;

const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

const IconButton = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-top: 0.5vh;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  right: 1vw;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  font-family: "Pretendard";
  font-weight: 400;
  margin-top: 10px;
`;

const DropdownItem = styled.a`
  color: ${(props) => props.color || "black"};
  padding: 13px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const AnalysisButton = styled.button`
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 77px;
  height: 37px;
  font-family: "Pretendard";
  font-weight: 500;
  background-color: transparent;
  color: #9a9a9a;
  border: 1px solid #acacac;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 5px;
  &:hover {
    background-color: #f7f7f7;
  }
`;

interface Diary {
  title: string;
  date: string;
  content: string;
  image: string;
}

export default function DiaryViewPage() {
  const { diaryId } = useParams<{ diaryId: string }>();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [diaryData, setDiaryData] = useState<DiaryData | null>(null);

  useEffect(() => {
    async function fetchDiary() {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token available.");
        setError("Authentication failed. No access token found.");
        return;
      }

      try {
        const response = await axios.get(
          `${config.API_URL}/api/diary/${diaryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.isSuccess) {
          setDiary(response.data.result);
          setError(null);
        } else {
          setError("Failed to load diary data.");
          console.error("API responded with an error:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch diary data:", error);
        setError("An error occurred while fetching diary data.");
      }
    }

    fetchDiary();
  }, [diaryId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token available.");
      setError("Authentication failed. No access token found.");
      return;
    }
    try {
      const response = await axios.delete(
        `${config.API_URL}/api/diary/${diaryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.isSuccess) {
        navigate("/diary");
      } else {
        alert("일기 삭제에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error deleting diary:", error);
      alert("일기 삭제에 실패하였습니다.");
    }
  };

  const handleConfirmEdit = () => {
    navigate(`/write/diary/${diaryId}`, { state: { diary } });
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAnalysis = async () => {
    try {
      const response = await axios.get(
        `${config.API_URL}/api/analyze/${diaryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.isSuccess) {
        console.log(response.data.result);
        const diaryData: DiaryData = {
          isSuccess: response.data.isSuccess,
          code: response.data.code,
          message: response.data.message,
          result: {
            content: response.data.result.content,
            createdAt: response.data.result.createdAt,
            date: response.data.result.date,
            diaryId: response.data.result.diaryId,
            emotionResponseDto: response.data.result.emotionResponseDto,
            emotions: response.data.result.emotions,
            imageUrl: response.data.result.imageUrl,
            memberId: response.data.result.memberId,
            title: response.data.result.title,
            updatedAt: response.data.result.updatedAt,
          },
        };
        setDiaryData(diaryData);
        navigate(`/analyze/${diaryId}`, { state: { diaryData } });
      } else {
        console.error("Failed to analyze diary:", response.data.message);
        alert("분석에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error analyzing diary:", error);
      alert("분석 중 오류가 발생하였습니다.");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!diary) return <div>Loading...</div>;

  return (
    <PageContainer>
      <SaveButtonContainer>
        <AnalysisButton onClick={handleAnalysis}>
          <img
            src={GraphImg}
            alt="Graph Icon"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          분석
        </AnalysisButton>
        <Dropdown ref={dropdownRef}>
          <IconButton onClick={toggleDropdown} src={MenuImg} alt="Menu Icon" />
          <DropdownContent style={{ display: dropdownOpen ? "block" : "none" }}>
            <DropdownItem onClick={() => setIsModalOpen(true)} color="#333333">
              수정하기
              <img
                src={PencilImg}
                alt="Edit Icon"
                style={{ width: "15px", height: "15px", marginLeft: "55px" }}
              />
            </DropdownItem>
            <DropdownItem
              onClick={() => setIsDeleteModalOpen(true)}
              color="red"
            >
              삭제하기
              <img
                src={GarbageImg}
                alt="Delete Icon"
                style={{ width: "17px", height: "17px", marginLeft: "53px" }}
              />
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </SaveButtonContainer>
      <DateContainer>
        <DateLabel>Date</DateLabel>
        <DateText>{diary.date}</DateText>
      </DateContainer>
      <DiaryTitle>{diary.title}</DiaryTitle>
      <hr style={{ width: "100%", color: "#CECECE" }} />
      {diary.image && <DiaryImage src={diary.image} alt="Diary" />}
      <ContentTextarea>{diary.content}</ContentTextarea>
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmEdit}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          handleDeleteConfirm();
          setIsDeleteModalOpen(false);
        }}
      />
    </PageContainer>
  );
}
