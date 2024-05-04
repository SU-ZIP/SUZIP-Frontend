import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './components/auth/AuthContext';
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
import KakaoCallback from "./components/social/KakaoCallback";

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <HomePage />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header /> <AboutPage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header /> <SignInPage />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header /> <SignUpPage />
              </>
            }
          />
          <Route
            path="/archives"
            element={
              <>
                <Header /> <ArchivePage />
              </>
            }
          />
          <Route
            path="/write"
            element={
              <>
                <Header /> <WritePage />
              </>
            }
          />
          <Route
            path="/analyze"
            element={
              <>
                <Header /> <AnalyzePage />
              </>
            }
          />
          <Route
            path="/diary"
            element={
              <>
                <Header /> <DiaryPage />
              </>
            }
          />
          <Route
            path="/diaryView"
            element={
              <>
                <Header /> <DiaryViewPage />
              </>
            }
          />
          <Route
            path="/deleteAccount"
            element={
              <>
               <DeleteAccount />
              </>
            }
          />
          <Route
            path="/scrapPage"
            element={
              <>
                <Header /> <ScrapPage />
              </>
            }
          />
           <Route
            path="/login/oauth2/code/kakao"
            element={<KakaoCallback />} // KakaoCallback 라우트 추가
          />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
