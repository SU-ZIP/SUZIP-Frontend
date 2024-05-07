import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage"; 
import AboutPage from "./pages/AboutPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ArchivePage from "./pages/ArchivePage";
import WritePage from "./pages/WritePage";
import AnalyzePage from "./pages/AnalyzePage";
import DiaryPage from "./pages/DiaryPage";
import DiaryViewPage from "./pages/DiaryViewPage";
import DeleteAccount from "./pages/DeleteAccount";
import ScrapPage from "./pages/ScrapPage";
import MyPage from "./pages/MyPage";
import KakaoCallback from "./components/social/KakaoCallback";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomeOrAboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/archives" element={<ArchivePage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/write/diary/:diaryId" element={<WritePage />} />
            <Route path="/write/date/:date" element={<WritePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/diary/:diaryId" element={<DiaryViewPage />} />
            <Route path="/deleteAccount" element={<DeleteAccount />} />
            <Route path="/scrapPage" element={<ScrapPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/login/oauth2/code/kakao" element={<KakaoCallback />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function HomeOrAboutPage() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <HomePage /> : <AboutPage />;
}

export default App;
