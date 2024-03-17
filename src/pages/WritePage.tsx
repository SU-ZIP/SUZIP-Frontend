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

export default function WritePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setContent(e.target?.result?.toString() || '');
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  return (
    <PageContainer>
      <SaveButtonContainer>
        <SaveButton onClick={handleSaveClick}>저장하기</SaveButton>
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
      <SaveModal isOpen={isModalOpen} onClose={handleCloseModal} /> 
    </PageContainer>
  );
}
