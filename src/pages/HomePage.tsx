import React, { useState } from 'react';
import styled from "styled-components";

import prevMoveImg from '../assets/images/prevmove.png';
import nextMoveImg from '../assets/images/nextmove.png';
import todayMoveImg from '../assets/images/todaymove.png';
import addImg from '../assets/images/add.png';

const Container = styled.div``;

const Title = styled.h1`
  font-family: 'PPMonumentExtended', sans-serif;
  font-size: 41px;
  display: flex;
  align-items: center;
  margin-left: 13rem;
  color: #333333;
`;

const CalendarTable = styled.table`
  margin: 20px auto;
  width: 80%;
  border-collapse: collapse;
`;

const CalendarDayHeader = styled.th`
  font-family: 'PPMonumentExtended', sans-serif;
  font-weight: 300;
  color: #656565;
  padding: 20px 0;
  text-align: left;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
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

const CalendarDay = styled.td`
  font-family: 'PPMonumentExtended', sans-serif;
  cursor: pointer;
  font-weight: bold;
  color: #4B4B4B;
  padding: 20px 0 100px 0;
  vertical-align: top;
  transition: background-color 0.3s;
  &:hover {
    background-color: #F6F6F6;
    border-radius: 10px;
  }
  &:hover ${AddButton} {
    opacity: 1;
  }
`;

const DateMarker = styled.span<{ color?: string }>`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-image: ${props => props.color || getRandomGradient()};
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

const CalendarDayWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const gradients = [
  'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
  'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(0deg, #96fbc4 0%, #f9f586 100%)',
];

const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

interface CalendarDayProps {
  day: number;
  handleDayClick: (day: number) => void;
}

const CalendarDayComponent: React.FC<CalendarDayProps> = ({ day, handleDayClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  // 상태에서 setGradient를 제거합니다.
  const [gradient] = useState<string>(getRandomGradient());
  
  return (
    <CalendarDay onClick={() => handleDayClick(day)}>
      <DateContainer>
        <DateMarker color={gradient} />
        <span style={{ marginLeft: '10px' }}>{day}</span>
      </DateContainer>
      <CalendarDayWrapper onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <Tooltip style={{ visibility: showTooltip ? 'visible' : 'hidden' }}>일기 작성</Tooltip>
        <AddButton
          src={addImg}
          alt="Add"
          onClick={(e: React.MouseEvent<HTMLImageElement>) => {
            e.stopPropagation(); // CalendarDay의 onClick 이벤트가 함께 발생하지 않도록 방지합니다.
            window.location.href = '/WritePage'; // Write Page로 리디렉션합니다.
          }}
        />
      </CalendarDayWrapper>
    </CalendarDay>
  );
};



const generateCalendarDates = (
  year: number,
  month: number,
  handleDayClick: (day: number) => void
): JSX.Element[] => {
  const dates: JSX.Element[] = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  const dayCells: JSX.Element[] = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    dayCells.push(<CalendarDay key={`empty-start-${i}`}></CalendarDay>);
  }

  for (let i = 1; i <= numDaysInMonth; i++) {
    dayCells.push(<CalendarDayComponent key={`day-${i}`} day={i} handleDayClick={handleDayClick} />);
  }

  while (dayCells.length < 7 * Math.ceil((firstDayOfMonth + numDaysInMonth) / 7)) {
    dayCells.push(<CalendarDay key={`empty-end-${dayCells.length}`}></CalendarDay>);
  }

  for (let week = 0; week < dayCells.length / 7; week++) {
    dates.push(<tr key={`week-${week}`}>{dayCells.slice(week * 7, (week + 1) * 7)}</tr>);
  }

  return dates;
};

const HomePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handleDayClick = (day: number) => {
    console.log(`Clicked on day: ${day}`);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const dates = generateCalendarDates(currentYear, currentMonth, handleDayClick);

  return (
    <Container>
      <Title>
        {`${currentYear}. ${(currentMonth + 1).toString().padStart(2, '0')}`}
        <PrevMove src={prevMoveImg} alt="Previous Month" onClick={handlePrevMonth} />
        <NextMove src={nextMoveImg} alt="Next Month" onClick={handleNextMonth} />
        <TodayMove src={todayMoveImg} alt="Today" onClick={handleToday} />
      </Title>
      <CalendarTable>
        <thead>
          <tr>
            {['/SUN', '/MON', '/TUE', '/WED', '/THU', '/FRI', '/SAT'].map((day) => (
              <CalendarDayHeader key={day}>{day}</CalendarDayHeader>
            ))}
          </tr>
        </thead>
        <tbody>{dates}</tbody>
      </CalendarTable>
    </Container>
  );
};

export default HomePage;
