import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from "../assets/images/logo.png";
import Arrow from "../assets/images/dropdownarrow.png"; 
import { useAuth } from '../components/auth/AuthContext';
import axios from 'axios';
const PageContainer = styled.div`
  font-family: "Pretendard";
  letter-spacing: -0.5px;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 16px;
`;

const LogoImage = styled.img`
  width: 135px;
`;

const ContentContainer = styled.div`
  align-self: center;
  display: block;
  margin-top: 100px;
  width: fit-content;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  color: #333333;
  font-family: 600;
  align-self: flex-start; 
`;

const GrayLine = styled.hr`
  width: 100%;
  border: 0.5px solid #D0D0D0;
  margin-bottom: 20px;
`;

const Question = styled.p`
  font-size: 22px;
  margin-top: 40px;
  margin-bottom: -5px;
  font-weight: 600;
  color: #333333;
  align-self: flex-start; 
`;

const AdditionalInfo = styled.p`
  font-size: 18px;
  font-family: 500;
  color: #6B6B6B;
`;

const WithdrawButton = styled.button`
  width: 125px;
  height: 45px;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 18px;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 60px;
  &:hover {
    background-color: #444;
  }
  align-self: flex-start;
`;

const Dropdown = styled.select`
  margin-top: 15px;
  margin-bottom: 20px;
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 16px;
  color: #353535;
  width: 270px;
  height: 48px;
  padding-left: 10px;
  padding-right: 30px; 
  appearance: none;
  background-image: url(${Arrow}); 
  background-repeat: no-repeat;
  background-position: right 10px center; 
  background-size: 12px;
`;

const NoticeList = styled.div`
  width: 976px;
  margin-top: 40px; 
  margin-bottom: 40px; 
`;

const NoticeItem = styled.div`
  font-weight: 500;
  font-size: 18px; 
  color: #333333; 
  margin-bottom: 7px;
`;

const NoticeInfo = styled.div`
  font-size: 16px; 
  color: #919191; 
  margin-bottom: 20px;
`;

function DeleteAccount() {
  const { setLoginStatus } = useAuth();

  const handleDeleteAccount = () => {
    const accessToken = localStorage.getItem('accessToken');  
    axios.delete("http://localhost:8080/api/member/", {
        headers: {
            Authorization: `Bearer ${accessToken}`  
        }
    })
    .then(response => {
        if (response.data.isSuccess) {
            alert('계정이 성공적으로 삭제되었습니다.');
            setLoginStatus(false); 
            window.location.href = '/';  
        }
    })
    .catch(error => {
        console.error('Account deletion failed', error);
        alert('계정 삭제 중 문제가 발생했습니다.');
    });
};


  return (
    <PageContainer>
      <LogoContainer>
        <LogoImage src={Logo} alt="Logo" />
      </LogoContainer>
      <GrayLine />
      <ContentContainer> {/* 새로운 컨테이너 적용 */}
        <SectionTitle>회원 탈퇴</SectionTitle>
        <Question>어떤 점이 불편하셨나요?</Question>
        <AdditionalInfo>수집을 이용하면서 불편했던 점을 말씀해주시면, 수집의 서비스 개선에 참고하도록 하겠습니다.</AdditionalInfo>
        <Dropdown defaultValue="">
          <option value="" disabled hidden>탈퇴사유는 무엇인가요?</option>
          <option value="option1">서비스가 부족했어요</option>
          <option value="option2">원하는 서비스를 받지 못 했어요</option>
          <option value="option3">기타</option>
        </Dropdown>
        <Question>탈퇴 전, 꼭 확인하세요!</Question>
        <AdditionalInfo>탈퇴 전 반드시 아래 유의 사항을 확인하시기 바랍니다.</AdditionalInfo>
        <NoticeList>
          <NoticeItem>탈퇴 후 기간 내 정보 삭제</NoticeItem>
          <NoticeInfo>작성했던 일기, 감정 분석 등 개인 정보 일괄 삭제</NoticeInfo>
          <GrayLine />
          <NoticeItem>탈퇴 후 복구 불가</NoticeItem>
          <NoticeInfo>탈퇴 후 이전 데이터 복구 불가능</NoticeInfo>
          <GrayLine />
          <NoticeItem>수집 내 모든 서비스에서 탈퇴</NoticeItem>
          <NoticeInfo>수집 회원으로서 이용하던 서비스 모두 이용 불가</NoticeInfo>
        </NoticeList>
        <WithdrawButton onClick={handleDeleteAccount}>회원 탈퇴</WithdrawButton>
      </ContentContainer>
    </PageContainer>
  );
}

export default DeleteAccount;
