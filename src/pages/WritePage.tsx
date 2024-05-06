import axios from 'axios';
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhotoImg from '../assets/images/photo.png';
import DeleteImg from '../assets/images/Delete.png'
import SaveModal from '../components/modal/SaveModal';
import { useAuth } from '../components/auth/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PageContainer = styled.div`
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10vw;
`;

const DateContainer = styled.div`
  font-family: 'Pretendard';
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

const TitleInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: none;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 48px;
  color: #333333;
  outline: none;
  ::placeholder {
    color: #E1E1E0;
  }
`;

const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; 
  margin-bottom: 12px;
`;

const SaveButton = styled.button`
  width: 110px;
  height: 37px;
  font-family: "Pretendard";
  font-weight: 500;
  background-color: #333333; 
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;

  &:hover {
    background-color: #484848;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1vh;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #838383;

  &:hover {
    background-color: #e8e8e8;
    border-radius: 2px;
  }
`;

const ContentTextarea = styled.textarea`
  font-family: "Pretendard";
  outline: none; 
  width: 100%;
  height: 800px;
  padding: 8px;
  border: none;
  margin-top: 3vh;
  font-size: 20px;
  ::placeholder {
    color: #E1E1E0;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const IconImage = styled.img`
  margin-right: 6px;
  width: 17px;
`;

const EmotionSelect = styled.select`
  font-family: 'Pretendard';
  font-size: 16px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-right: 10px; // Adjusted margin
`;

const DeleteButton = styled.img`
  position: absolute;
  top: 5px;
  right: -15px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  padding: 4px;
`;

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { date: routeDate } = useParams<{ date?: string }>();  // URL에서 날짜 가져오기
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);  // 초기값은 오늘 날짜로 설정
  const { diaryId } = useParams<{ diaryId?: string }>();

  const [file, setFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const emotions = ["HAPPY", "ANGER", "SADNESS", "CONFUSION", "HURT", "ANXIETY"];
  const [emotion, setEmotion] = useState("");


  const handleEmotionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEmotion(event.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      window.location.href = 'http://localhost:8080/api/login'; 
    }
  }, [isLoggedIn, navigate]);




  useEffect(() => {
    console.log("Received date from URL:", routeDate);  // 로그로 날짜 확인
    if (routeDate) {
      setDate(routeDate);  // URL에서 받은 날짜로 상태 업데이트
    }
  }, [routeDate]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleSaveClick = async () => {
    if (isEditMode) {
      // 수정 모드일 때는 저장하기 대신 수정하기 동작
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          'Authorization': `Bearer ${token}`
        };
  
        const formData = new FormData();
        formData.append("request", JSON.stringify({
          title: title,
          content: content,
          date: date,
          emotions: emotion
        }));
  
        // 이미지가 수정되었을 경우에만 FormData에 추가합니다.
        if (file) {
          formData.append("file", file);
        } else {
          // 이미지를 수정하지 않은 경우 이전 이미지 URL을 유지합니다.
          const response = await axios.get(`http://localhost:8080/api/diary/${diaryId}`);
          const { data } = response;
          if (data.isSuccess) {
            // 이전 이미지 URL이 있는 경우에만 FormData에 추가합니다.
            if (data.result.imageUrl) {
              formData.append("imageUrl", data.result.imageUrl);
            }
          }
        }
  
        const response = await axios.patch(`http://localhost:8080/api/diary/${diaryId}`, formData, { headers });
        console.log('Diary updated:', response.data);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating the diary:', error);
      }
    } else {
      // 수정 모드가 아니면 일반적인 저장 동작
      setIsModalOpen(true);
    }
  };

  axios.defaults.withCredentials = true;

  const saveDiary = async () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const formData = new FormData();
    formData.append("request", JSON.stringify({
      title: title,
      content: content,
      date: date,
      emotions: emotion
    }));
    
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/diary", formData, { headers });
      console.log('Diary saved:', response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving the diary:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewSrc(""); 
  };


  useEffect(() => {
    if (diaryId) {
      setIsEditMode(true); // diaryId가 있을 경우 수정 모드로 설정
      fetchDiary(diaryId);
    }
  }, [diaryId]);
  
  // fetchDiary 함수 추가
  const fetchDiary = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/diary/${id}`);
      const { data } = response;
      if (data.isSuccess) {
        setTitle(data.result.title);
        setContent(data.result.content);
        setDate(data.result.date);
        setEmotion(data.result.emotion); // 이 코드는 다이어리에 감정 정보가 있는 경우에만 적용되어야 함
        setPreviewSrc(data.result.image); 
        // 다른 필요한 상태 업데이트 추가 가능
      } else {
        console.error('Failed to fetch diary:', data.message);
      }
    } catch (error) {
      console.error('Error fetching diary:', error);
    }
  };

  return (
    <PageContainer>
      <SaveButtonContainer>
        <SaveButton onClick={handleSaveClick}>{isEditMode ? '수정하기' : '저장하기'}</SaveButton>
      </SaveButtonContainer>
      <DateContainer>
        <DateLabel>Date</DateLabel>
        <DateText>{date}</DateText>
      </DateContainer>
      <TitleInput
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="제목 없음"
      />
      <hr style={{ width: '100%', color: '#CECECE' }} />
      <FileInput
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <ButtonContainer>
        <select value={emotion} onChange={handleEmotionChange}>
          <option value="">감정 선택</option>
          {emotions.map(em => (
            <option key={em} value={em}>{em}</option>
          ))}
        </select>
        <Button onClick={() => document.getElementById('file')?.click()}>
          <IconImage src={PhotoImg} alt="Upload" />
          사진 첨부
        </Button>
      </ButtonContainer>
      {previewSrc && (
        <div style={{ position: 'relative' }}>
          <img src={previewSrc} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '2vh' }} />
          <DeleteButton src={DeleteImg} onClick={() => setPreviewSrc("")}></DeleteButton>
        </div>
      )}
      <ContentTextarea
        value={content}
        onChange={handleContentChange}
        placeholder="내용을 입력하세요"
      />
      <SaveModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={saveDiary} />
    </PageContainer>
  );
}