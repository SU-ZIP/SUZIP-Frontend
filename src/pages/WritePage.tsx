import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import PhotoImg from '../assets/images/photo.png';

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
  outline: none; /* 클릭 시 파란색 테두리 제거 */
  ::placeholder {
    color: #E1E1E0;
  }
`;

const SaveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  margin-bottom: 12px; // Date 정보와의 간격
`;

const SaveButton = styled.button`
  width: 110px;
  height: 37px;
  font-family: "Pretendard";
  font-weight: 500;
  background-color: #333333; // 녹색 배경
  color: white; // 흰색 글씨
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px; // 버튼 모서리 둥글게

  &:hover {
    background-color: #484848; // 호버 시 색상 변경
  }
`;


const ButtonContainer = styled.div`
  align-self: flex-end; // 오른쪽 정렬
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
  font-weight: 500; // 글씨 두께 조정
  color: #838383;

  &:hover {
    background-color: #e8e8e8;
    border-radius: 2px;
  }
`;


const ContentTextarea = styled.textarea`
  font-family: "Pretendard";
  outline: none; /* 클릭 시 파란색 테두리 제거 */
  width: 100%;
  height: 150px;
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
    console.log("저장하기 클릭됨");
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
    </PageContainer>
  );
}
