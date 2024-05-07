import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/auth/AuthContext";
import defaultProfileImg from "../assets/images/profile.png";
import EditImg from '../assets/images/profiledit.png'

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 20px;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 300px;
  border-right: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20vw;
  height: 70vh;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const UserName = styled.div`
  font-size: 1.3rem;
  margin-right: 1vw;
  display: flex;
  align-items: center;
  margin-top: 1vh;
  margin-bottom: 2vh;
`;

const UserNameText = styled.span`
  font-weight: 600;
`;

const UserSuffix = styled.span`
  margin-left: 0.2vw;
  font-weight: 400;
`;

const LogoutButton = styled.button`
  width: 110px;
  height: 37px;
  font-family: "Pretendard";
  font-weight: 500;
  background-color: transparent;
  color: #535353;
  border: 1px solid #ACACAC;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;

  &:hover {
    background-color: #F7F7F7;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 10vh;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-family: "Pretendard";
  font-weight: 500;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
`;

const InteractiveBox = styled.div`
  width: 960px;
  border-radius: 10px;
  height: 65px;
  padding: 10px 20px;
  border: 1px solid #A1A1A1;
  margin-bottom: 5vh;
  display: flex;
  align-items: center;  // Vertically center the text inside the box
`;

const InteractiveText = styled.div`
  font-size: 20px;
  font-family: "Pretendard";
  font-weight: 300;
  margin-left: 10px;
  cursor: pointer;
`;

const MyPage = () => {
  const { userName, isLoggedIn, setLoginStatus } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    profileImage: ''
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/member/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (response.data.isSuccess) {
          setProfile({
            name: response.data.result.name,
            profileImage: response.data.result.profileImage || defaultProfileImg
          });
        } else {
          throw new Error('프로필 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('프로필 정보를 불러오는데 실패했습니다:', error);
        navigate('/login');
      }
    };
  
    fetchProfile();
  }, [isLoggedIn, navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setLoginStatus(false, '');
    navigate('/about');
  };

  return (
    <PageContainer>
      <Sidebar>
        <ProfileImage src={profile.profileImage} alt="프로필" />
        <UserName>
            <UserNameText>{profile.name || '사용자 이름 없음'}</UserNameText>
            <UserSuffix> 님</UserSuffix>
        </UserName>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Sidebar>
      <MainContent>
        <SectionTitle>MY</SectionTitle>
        <InteractiveBox>
          <InteractiveText onClick={() => navigate('/scrapPage')}>
            스크랩 목록
          </InteractiveText>
        </InteractiveBox>
        <SectionTitle>계정 관리</SectionTitle>
        <InteractiveBox>
          <InteractiveText onClick={() => navigate('/deleteAccount')}>
            회원 탈퇴
          </InteractiveText>
        </InteractiveBox>
      </MainContent>
    </PageContainer>
  );
};

export default MyPage;
