import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import IndexPage from "./pages/IndexPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

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
          <Route path="/index" element={<IndexPage />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
