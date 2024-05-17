import React, { useEffect } from 'react';
import axios from 'axios';
import config from '../../assets/path/config';

const KakaoCallback = () => {
  
  
  useEffect(() => {
    console.log("호출됨")
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    if (!code) {
      alert('인증 코드를 받지 못했습니다.');
      window.location.href = "/login";
      return;
    }
   
    // 백엔드 서버로 인증 코드를 전송하여 액세스 토큰 요청
    axios.post('login/oauth2/code/kakao', {
      authorizationCode: code
    })
    .then((response) => {
      // 백엔드 서버에서 발급한 JWT를 localStorage에 저장
      localStorage.setItem("accessToken", response.headers.accesstoken);
      console.log('로그인에 성공했습니다.');
      // 메인 페이지로 리디렉션
      window.location.href = "/";
    })
    .catch((error) => {
      // 오류 처리: 로그인 페이지로 리디렉션
      console.error('로그인 에러:', error);
      alert('로그인 처리 중 에러가 발생했습니다.');
      window.location.href = "/login";
    });
  }, []);

  // 로그인 처리 중임을 나타내는 UI 컴포넌트를 렌더링할 수 있습니다.
  return (
    <div>로그인 처리 중...</div>
  );
};

export default KakaoCallback;
