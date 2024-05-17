import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/auth/AuthContext";
import defaultProfileImg from "../assets/images/profile.png";
import editIcon from '../assets/images/profiledit.png';
import PencilImg from '../assets/images/pencil.png';
import config from '../assets/path/config';

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
  margin-left: 10vw;
  height: 70vh;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1vh;
  margin-bottom: 2.5vh;
  font-family: "Pretendard";
  font-size: 1.3rem;
`;

const UserName = styled.span`
  font-weight: 600;
`;

const UserSuffix = styled.span`
  font-weight: 400;
  margin-left: 0.2vw;
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
  align-items: center;
`;

const InteractiveText = styled.div`
  font-size: 20px;
  font-family: "Pretendard";
  font-weight: 300;
  margin-left: 10px;
  cursor: pointer;
`;

const EditIcon = styled.img`
  width: 13px;
  height: 13px;
  cursor: pointer;
  margin-left: 10px;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileEditIcon = styled.img`
  position: absolute;
  width: 28px;
  height: 28px;
  cursor: pointer;
  right: 6px;
  bottom: 20px;
`;

const MyPage = () => {
  const { userName, isLoggedIn, setLoginStatus } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: '',
    profileImage: ''
  });

  useEffect(() => {
    // if (!isLoggedIn) {
    //   navigate('/login');
    //   return;
    // }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/member/`, {
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

  const handleEditProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error('File input is not available');
    }
  };

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('request', new Blob([JSON.stringify({ name: profile.name })], {
        type: "application/json"
      }));
  
      try {
        const response = await axios.patch(`${config.API_URL}/api/member/`, formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
  
        if (response.data.isSuccess) {
          setProfile(prev => ({
            ...prev,
            name: response.data.result.name,
            profileImage: response.data.result.profileImage
          }));
          console.log('프로필 이미지가 성공적으로 업데이트 되었습니다:', response.data.result.profileImage);
        } else {
          console.error('프로필 이미지 업데이트에 실패했습니다:', response.data.message);
        }
      } catch (error) {
        console.error('프로필 이미지 업데이트 실패:', error);
      }
    }
  };
  
  

  return (
    <PageContainer>
      <Sidebar>
        <ProfileContainer>
          <ProfileImage src={profile.profileImage} alt="Profile" />
          <ProfileEditIcon src={PencilImg} alt="Edit Profile" onClick={handleEditProfileClick} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
            accept="image/*"
          />
        </ProfileContainer>
        <UserNameContainer>
          <UserName>{profile.name || 'User'}</UserName>
          <UserSuffix>님</UserSuffix>
          <EditIcon src={editIcon} alt="Edit Profile" onClick={() => navigate('/editProfile')} />
        </UserNameContainer>
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
