import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const PageContainer = styled.div`
display: flex;
justify-content: center;
align-items: start;
padding: 20px;
height: 100vh;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  font-family: "Pretendard";
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
  margin-left: 50px;
  margin-top: 50px;
  align-self: flex-start;
  letter-spacing: -0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 18px;
  color: #939393;
  font-family: "Pretendard";
  margin-right: 10px;
  width: 100px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 351px;
  height: 40px;
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #939393;
  font-family: "Pretendard";
  border: 1px solid #BCBCBC;
  border-radius: 5px;
  background-color: transparent;
`;

const Button = styled.button`
  width: 214px;
  height: 54px;
  padding: 10px 0;
  background-color: #333333;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  position: absolute; // Position it relative to the container
  &:hover {
    background-color: #444;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 10vh;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-family: "Pretendard";
  font-weight: 600;
  margin-bottom: 20px;
  margin-left: 10px;
  letter-spacing: -0.5px;
`;

const InteractiveBox = styled.div`
  width: 1302px;
  border-radius: 5px;
  height: 402px;
  padding: 10px 20px;
  background-color: #F9F9FA;
  margin-bottom: 5vh;
  display: flex;
  align-items: center;
`;

function EditProfile() {
    const [profile, setProfile] = useState({
        email: '',
        name: ''
    });

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get('http://localhost:8080/api/member/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (response.data.isSuccess) {
            setProfile({
              email: response.data.result.email,
              name: response.data.result.name
            });
          } else {
            console.error('Failed to fetch profile data');
          }
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
          ...prev,
          [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', profile.name);

        const accessToken = localStorage.getItem('accessToken');
        axios.patch('http://localhost:8080/api/member/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (response.data.isSuccess) {
            console.log('Name updated successfully:', response.data);
          } else {
            console.error('Failed to update name:', response.data.message);
          }
        })
        .catch(error => {
          console.error('Error updating name:', error);
        });
    };
    
  return (
    <PageContainer>
    <MainContent>
      <SectionTitle>회원 정보 수정</SectionTitle>
      <InteractiveBox>
        <Subtitle>회원 정보</Subtitle>
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" name="email" value={profile.email} readOnly />
          </FormRow>
          <FormRow>
            <Label htmlFor="name">이름</Label>
            <Input id="name" type="text" name="name" value={profile.name} onChange={handleInputChange} />
          </FormRow>
        </Form>
      </InteractiveBox>
      <Button type="submit">저장하기</Button>
    </MainContent>
  </PageContainer>
  );
}

export default EditProfile;