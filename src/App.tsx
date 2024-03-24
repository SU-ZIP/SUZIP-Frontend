import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
