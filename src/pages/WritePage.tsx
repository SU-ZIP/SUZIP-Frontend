import axios from 'axios';
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import PhotoImg from '../assets/images/photo.png';

import SaveModal from '../components/modal/SaveModal';

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
  align-self: flex-end; 
  margin-bottom: 12px;
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
  margin-top: -10px;
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
  margin-bottom: 12px;
`;




export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const emotions = ["HAPPY", "ANGER", "SADNESS", "CONFUSION", "HURT", "ANXIETY"];

  const [emotion, setEmotion] = useState("");

const handleEmotionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setEmotion(event.target.value);
};

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    setDate(formattedDate);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  

  const handleSaveClick = () => {
    console.log('Save button clicked');
    setIsModalOpen(true);
  };
  
  const saveDiary = async () => {
    console.log('Saving diary...');
    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify({
      title: title,
      content: content,
      date: date,
      emotions: emotion
    })], { type: 'application/json' }));
  
    if (file) {
      console.log('File attached:', file.name);
      formData.append("file", file);
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/diary", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Diary saved:', response.data);
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error('Error saving the diary:', error);
    }
  };
  

  // 모달을 닫는 함수
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <PageContainer>
      <SaveButtonContainer>
        <SaveButton onClick={handleSaveClick}>저장하기</SaveButton>
      </SaveButtonContainer>
      <DateContainer>
        <DateLabel>Date</DateLabel>
        <DateText>{date}</DateText>
        <EmotionSelect value={emotion} onChange={handleEmotionChange}>
    <option value="">감정 선택</option>
    {emotions.map(em => (
      <option key={em} value={em}>{em}</option>
    ))}
  </EmotionSelect>
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
        <Button onClick={() => document.getElementById('file')?.click()}>
          <IconImage src={PhotoImg} alt="Upload" />
          사진 첨부
        </Button>
      </ButtonContainer>
      {content.startsWith("data:image") ? (
        <img src={content} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '12px' }} />
      ) : (
        <ContentTextarea
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력하세요"
        />
      )}
   <SaveModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={saveDiary} />
    </PageContainer>
  );
}
