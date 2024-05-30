import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext";
import defaultProfileImg from "../assets/images/profile.png";
import editIcon from "../assets/images/profiledit.png";
import PencilImg from "../assets/images/pencil.png";
import config from "../assets/path/config";
import ApexCharts from "apexcharts";

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
  height: 93%;
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
  border: 1px solid #acacac;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 10vh;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333333;
  font-family: "Pretendard";
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
`;

const InteractiveBox = styled.div`
  width: 960px;
  border-radius: 10px;
  height: 65px;
  padding: 10px 20px;
  border: 1px solid #a1a1a1;
  margin-bottom: 1vh;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ChartBox = styled.div`
  width: 960px;
  height: auto;
  border-radius: 10px;
  padding: 20px 20px;
  border: 1px solid #a1a1a1;
  margin-bottom: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard";
  font-weight: 300;
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

const EmptyBox = styled.div`
  width: 100%;
  height: 3vh;
`;

const MyPage = () => {
  const { userName, isLoggedIn, setLoginStatus } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chartRef = useRef<ApexCharts | null>(null);

  const [profile, setProfile] = useState({
    name: "",
    profileImage: "",
  });

  const [chartData, setChartData] = useState<{ [key: string]: number }>({
    HAPPY: 0,
    ANGER: 0,
    SADNESS: 0,
    HURT: 0,
    ANXIETY: 0,
  });

  const fetchMonthEmotions = async (year: number, month: number) => {
    try {
      const response = await axios.get(
        `${config.API_URL}/api/emotions/months`,
        {
          params: { year, month },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.isSuccess) {
        const emotions = response.data.result;
        const emotionCount: { [key: string]: number } = {
          HAPPY: 0,
          ANGER: 0,
          SADNESS: 0,
          HURT: 0,
          ANXIETY: 0,
        };

        emotions.forEach((emotion: { emotion: string }) => {
          if (emotion.emotion in emotionCount) {
            emotionCount[emotion.emotion]++;
          }
        });

        setChartData(emotionCount);
      } else {
        console.error("Failed to fetch emotions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching emotions:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/api/member/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.data.isSuccess) {
          setProfile({
            name: response.data.result.name,
            profileImage:
              response.data.result.profileImage || defaultProfileImg,
          });
        } else {
          throw new Error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate(`${config.API_URL}/api/login`);
      }
    };

    fetchProfile();
    fetchMonthEmotions(new Date().getFullYear(), new Date().getMonth() + 1);
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const createGradient = (id: string, colors: string[]) => {
      const svgNS = "http://www.w3.org/2000/svg";
      const grad = document.createElementNS(svgNS, "linearGradient");
      grad.setAttribute("id", id);
      grad.setAttribute("x1", "0%");
      grad.setAttribute("y1", "0%");
      grad.setAttribute("x2", "100%");
      grad.setAttribute("y2", "100%");

      colors.forEach((color, index) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(index / (colors.length - 1)) * 100}%`);
        stop.setAttribute("stop-color", color);
        grad.appendChild(stop);
      });

      return grad;
    };

    const gradients = {
      HAPPY: createGradient("happyGradient", ["#96fbc4", "#f9f586"]),
      ANGER: createGradient("angerGradient", ["#ff9a9e", "#fad0c4"]),
      SADNESS: createGradient("sadnessGradient", ["#a1c4fd", "#c2e9fb"]),
      ANXIETY: createGradient("anxietyGradient", ["#f6d365", "#fda085"]),
      HURT: createGradient("hurtGradient", ["#667eea", "#764ba2"]),
    };

    const legendColors = [
      "#96fbc4",
      "#ff9a9e",
      "#a1c4fd",
      "#f6d365",
      "#667eea",
    ];

    if (!chartRef.current) {
      const options = {
        series: Object.values(chartData),
        chart: {
          width: "60%",
          type: "pie",
          events: {
            mounted: (chartContext: any, config: any) => {
              const svgElement = chartContext.el.querySelector("svg");
              const defs =
                svgElement.querySelector("defs") ||
                document.createElementNS("http://www.w3.org/2000/svg", "defs");
              Object.values(gradients).forEach((gradient) =>
                defs.appendChild(gradient)
              );

              svgElement.insertBefore(defs, svgElement.firstChild);
            },
          },
        },
        labels: ["행복", "분노", "슬픔", "상처", "불안"], // 한국어 라벨
        colors: [
          "url(#happyGradient)",
          "url(#angerGradient)",
          "url(#sadnessGradient)",
          "url(#anxietyGradient)",
          "url(#hurtGradient)",
        ],
        theme: {
          monochrome: {
            enabled: false,
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -30,
              style: {
                textShadow: "none", // 데이터 라벨의 텍스트 그림자를 제거합니다.
              },
            },
          },
        },
        dataLabels: {
          style: {
            textShadow: "none",
          },
          formatter: (val: number, opts: any): [string, string] => {
            const name = opts.w.globals.labels[opts.seriesIndex];
            return [name, val.toFixed(1) + "%"];
          },
        },
        legend: {
          show: true,
          position: "top",
          markers: {
            fillColors: legendColors,
            useSeriesColors: false,
          },
        },
      };

      const chartElement = document.querySelector("#chart");
      if (chartElement) {
        chartRef.current = new ApexCharts(chartElement, options);
        chartRef.current.render();
      } else {
        console.error("Chart element not found");
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartData]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setLoginStatus(false, "");
    navigate("/about");
  };

  const handleEditProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input is not available");
    }
  };

  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "request",
        new Blob([JSON.stringify({ name: profile.name })], {
          type: "application/json",
        })
      );

      try {
        const response = await axios.patch(
          `${config.API_URL}/api/member/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.isSuccess) {
          setProfile((prev) => ({
            ...prev,
            name: response.data.result.name,
            profileImage: response.data.result.profileImage,
          }));
          console.log(
            "프로필 이미지가 성공적으로 업데이트 되었습니다:",
            response.data.result.profileImage
          );
        } else {
          console.error(
            "프로필 이미지 업데이트에 실패했습니다:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("프로필 이미지 업데이트 실패:", error);
      }
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <ProfileContainer>
          <ProfileImage src={profile.profileImage} alt="Profile" />
          <ProfileEditIcon
            src={PencilImg}
            alt="Edit Profile"
            onClick={handleEditProfileClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
            accept="image/*"
          />
        </ProfileContainer>
        <UserNameContainer>
          <UserName>{profile.name || "User"}</UserName>
          <UserSuffix>님</UserSuffix>
          <EditIcon
            src={editIcon}
            alt="Edit Profile"
            onClick={() => navigate("/editProfile")}
          />
        </UserNameContainer>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Sidebar>
      <MainContent>
        <SectionTitle>감정 통계</SectionTitle>
        <ChartBox id="chart" />
        <EmptyBox />
        <SectionTitle>MY</SectionTitle>
        <InteractiveBox onClick={() => navigate("/scrapPage")}>
          <InteractiveText>스크랩 목록</InteractiveText>
        </InteractiveBox>
        <InteractiveBox onClick={() => navigate("/suzip")}>
          <InteractiveText>행복 수집</InteractiveText>
        </InteractiveBox>
        <EmptyBox />
        <SectionTitle>계정 관리</SectionTitle>
        <InteractiveBox onClick={() => navigate("/deleteAccount")}>
          <InteractiveText>회원 탈퇴</InteractiveText>
        </InteractiveBox>
      </MainContent>
    </PageContainer>
  );
};

export default MyPage;
