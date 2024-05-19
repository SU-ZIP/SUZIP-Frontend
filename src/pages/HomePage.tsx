import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from '../assets/path/config';
import prevMoveImg from "../assets/images/prevmove.png";
import nextMoveImg from "../assets/images/nextmove.png";
import todayMoveImg from "../assets/images/todaymove.png";
import addImg from "../assets/images/add.png";

import WriteModal from "../components/modal/WriteModal";
import AlreadyDiaryModal from "../components/modal/AlreadyDairyModal"; // 올바르게 임포트

const Container = styled.div``;

const Title = styled.h1`
  font-family: "PPMonumentExtended", sans-serif;
  font-size: 41px;
  display: block;
  margin-bottom: 2.5vh;
  margin-left: 10vw;
  width: fit-content;
`;

const CalendarTable = styled.table`
  margin: 20px auto;
  width: 80%;
  border-collapse: collapse;
`;

const CalendarDayHeader = styled.th`
  font-family: "PPMonumentExtended", sans-serif;
  font-weight: 200;
  color: #656565;
  padding: 20px 0;
  text-align: left;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  transition: transform 0.3s ease-in-out;
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: 70px;
  font-size: 13px;
  background-color: #333333;
  color: #ffffff;
  text-align: center;
  border-radius: 3px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  margin-top: -10px;
  left: 50%;
  transform: translateX(-50%);
`;

const AddButton = styled.img`
  width: 27px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 35px;
  opacity: 0;
  cursor: pointer;
`;

const CalendarDayWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
`;

const CalendarDay = styled.td<{ isEmpty?: boolean }>`
  font-family: "PPMonumentExtended", sans-serif;
  cursor: ${({ isEmpty }) => (isEmpty ? "default" : "pointer")};
  font-weight: 300;
  color: #4b4b4b;
  padding: 20px 0 100px 0;
  vertical-align: top;
  transition:
    background-color 0.3s,
    margin-left 0.3s;
  ${({ isEmpty }) =>
    !isEmpty &&
    `
  &:hover {
    background-color: #f6f6f6;
    margin-left: 10px; 
    transform: scale(0.95);
    border-radius: 10px;
    padding: 20px 0 100px 0;
    & > ${DateContainer} {
      transform: translateX(10px); 
    }
  }
  &:hover ${AddButton} {
    opacity: 1;
  }
  `}
`;

const DisabledCalendarDay = styled(CalendarDay)`
  color: #d3d3d3;
  pointer-events: none;
`;

const DateMarker = styled.span<{ color?: string }>`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background: ${(props) => props.color || "F1F1F1"};
  display: inline-block;
`;

const PrevMove = styled.img`
  cursor: pointer;
  margin: 0 5px;
  width: 31px;
  margin-left: 23px;
`;

const NextMove = styled.img`
  cursor: pointer;
  margin: 0 5px;
  width: 31px;
`;

const TodayMove = styled.img`
  cursor: pointer;
  margin: 0 5px;
  height: 31px;
`;

interface EmotionData {
  emotion: 'HAPPINESS' | 'ANGER' | 'SADNESS' | 'ANXIETY' | 'HURT' | null;
  date: string;
  diaryId?: number; // 추가: 일기 ID
}

const gradients: { [key in Exclude<EmotionData['emotion'], null>]: string } = {
  HAPPINESS: "linear-gradient(45deg, #96fbc4 0%, #f9f586 100%)",
  ANGER: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  SADNESS: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  ANXIETY: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  HURT: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
};

const fetchMonthlyEmotionData = async (year: number, month: number) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(`${config.API_URL}/api/emotions/months`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        year,
        month
      }
    });
    return response.data.result as EmotionData[];
  } catch (error) {
    console.error("Error fetching monthly emotion data:", error);
    return [];
  }
};

interface CalendarDayProps {
  day: number;
  handleDayClick: (day: number, emotionData: EmotionData | undefined) => void;
  openModal: () => void;
  isFuture: boolean;
  isEmpty?: boolean;
  emotionData?: EmotionData;
}

const CalendarDayComponent: React.FC<CalendarDayProps> = ({
  day,
  handleDayClick,
  openModal,
  isFuture,
  isEmpty,
  emotionData,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const gradient = emotionData && emotionData.emotion ? gradients[emotionData.emotion] : "#F1F1F1";
  
  // 로그 추가
  console.log(`Day: ${day}, Emotion Data:`, emotionData);

  if (isFuture) {
    return (
      <DisabledCalendarDay>
        <DateContainer>
          <span style={{ marginLeft: "10px", color: "#d3d3d3" }}>{day}</span>
        </DateContainer>
      </DisabledCalendarDay>
    );
  }

  return (
    <CalendarDay onClick={() => handleDayClick(day, emotionData)} isEmpty={isEmpty}>
      <DateContainer>
        <DateMarker color={gradient} />
        <span style={{ marginLeft: "10px" }}>{day}</span>
      </DateContainer>
      <CalendarDayWrapper
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Tooltip style={{ visibility: showTooltip ? "visible" : "hidden" }}>
          일기 작성
        </Tooltip>
        <AddButton
          src={addImg}
          alt="Add"
          onClick={() => openModal()}
        />
      </CalendarDayWrapper>
    </CalendarDay>
  );
};

const generateCalendarDates = async (
  year: number,
  month: number,
  handleDayClick: (day: number, emotionData: EmotionData | undefined) => void,
  openModal: () => void
): Promise<{ dates: JSX.Element[], emotionMap: { [key: string]: EmotionData | undefined } }> => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const dates: JSX.Element[] = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  const dayCells: JSX.Element[] = [];

  const emotionData = await fetchMonthlyEmotionData(year, month + 1);
  
  // 로그 추가
  console.log("Fetched Emotion Data:", emotionData);

  const emotionMap: { [key: string]: EmotionData | undefined } = {};
  emotionData.forEach(emotion => {
    emotionMap[emotion.date] = emotion;
  });

  for (let i = 0; i < firstDayOfMonth; i++) {
    dayCells.push(<CalendarDay key={`empty-start-${i}`} isEmpty></CalendarDay>);
  }

  for (let i = 1; i <= numDaysInMonth; i++) {
    const isFuture = year > currentYear || (year === currentYear && (month > currentMonth || (month === currentMonth && i > currentDate)));
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    const emotionForDay = emotionMap[dateStr];
    dayCells.push(
      <CalendarDayComponent
        key={`day-${i}`}
        day={i}
        handleDayClick={handleDayClick}
        openModal={openModal}
        isFuture={isFuture}
        emotionData={emotionForDay}
      />
    );
  }

  while (
    dayCells.length <
    7 * Math.ceil((firstDayOfMonth + numDaysInMonth) / 7)
  ) {
    dayCells.push(
      <CalendarDay key={`empty-end-${dayCells.length}`} isEmpty></CalendarDay>
    );
  }

  for (let week = 0; week < dayCells.length / 7; week++) {
    dates.push(
      <tr key={`week-${week}`}>{dayCells.slice(week * 7, (week + 1) * 7)}</tr>
    );
  }

  return { dates, emotionMap };
};

const HomePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlreadyDiaryOpen, setIsAlreadyDiaryOpen] = useState(false); // 추가: AlreadyDiaryModal 상태
  const [diaryId, setDiaryId] = useState<number | null>(null); // 추가: 일기 ID 상태
  const [dates, setDates] = useState<JSX.Element[]>([]);
  const [emotionMap, setEmotionMap] = useState<{ [key: string]: EmotionData | undefined }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDates = async () => {
      const { dates: calendarDates, emotionMap: fetchedEmotionMap } = await generateCalendarDates(currentYear, currentMonth, handleDayClick, openModal);
      setDates(calendarDates);
      setEmotionMap(fetchedEmotionMap);
    };
    fetchDates();
  }, [currentYear, currentMonth]);

  const handleDayClick = (day: number, emotionData: EmotionData | undefined) => {
    const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(formattedDate);

    if (emotionData && emotionData.diaryId) {
      setDiaryId(emotionData.diaryId);
      setIsAlreadyDiaryOpen(true);
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const redirectToWritePage = () => {
    navigate(`/write/date/${selectedDate}`);
    setIsModalOpen(false);
  };

  const redirectToDiaryPage = () => {
    if (diaryId !== null) {
      navigate(`/diary/${diaryId}`);
    }
    setIsAlreadyDiaryOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    const todayFormatted = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    setSelectedDate(todayFormatted);
  };

  return (
    <Container>
      <Title>
        {`${currentYear}. ${(currentMonth + 1).toString().padStart(2, "0")}`}
        <PrevMove
          src={prevMoveImg}
          alt="Previous Month"
          onClick={handlePrevMonth}
        />
        <NextMove
          src={nextMoveImg}
          alt="Next Month"
          onClick={handleNextMonth}
        />
        <TodayMove src={todayMoveImg} alt="Today" onClick={handleToday} />
      </Title>
      <CalendarTable>
        <thead>
          <tr>
            {["/SUN", "/MON", "/TUE", "/WED", "/THU", "/FRI", "/SAT"].map(
              (day) => (
                <CalendarDayHeader key={day}>{day}</CalendarDayHeader>
              )
            )}
          </tr>
        </thead>
        <tbody>{dates}</tbody>
      </CalendarTable>
      <WriteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={redirectToWritePage}
      />
      <AlreadyDiaryModal
        isOpen={isAlreadyDiaryOpen}
        onClose={() => setIsAlreadyDiaryOpen(false)}
        onConfirm={redirectToDiaryPage}
      />
    </Container>
  );
};

export default HomePage;
