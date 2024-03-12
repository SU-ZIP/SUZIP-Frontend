import React from 'react';
import styled from "styled-components";

// 스타일 컴포넌트 정의
const Title = styled.h1`
  margin-left: 10rem;
  font-family: 'PPMonumentExtended', sans-serif;
`;

const CalendarTable = styled.table`
  margin-left: 10rem;
  margin-right: 10rem;
  width: calc(100% - 20rem); // 10rem 마진 고려
  border-collapse: collapse;
`;

const CalendarDayHeader = styled.th`
  font-family: 'PPMonumentExtended', sans-serif;
  color: #656565;
`;

const CalendarDay = styled.td`
  font-family: 'PPMonumentExtended', sans-serif;
  cursor: pointer;
  padding: 10px;
`;

const DateMarker = styled.span<{ color?: string }>`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${props => props.color || '#ccc'};
  display: inline-block;
  margin-right: 5px;
`;

// 유틸리티 함수 및 컴포넌트 정의
const colors = ['#FFB6C1', '#87CEFA', '#98FB98', '#FFD700', '#FFA07A'];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const generateCalendarDates = (year: number, month: number, handleDayClick: (day: number) => void) => {
  const dates = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();
  let dayCells = [];

  // 월의 첫 날이 일요일이 아닐 경우, 해당 요일까지 빈 칸으로 채웁니다.
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayCells.push(<CalendarDay key={`empty-start-${i}`}></CalendarDay>);
  }

  // 실제 날짜 채우기
  for (let i = 1; i <= numDaysInMonth; i++) {
    dayCells.push(
      <CalendarDay key={i} onClick={() => handleDayClick(i)}>
        <DateMarker color={getRandomColor()}/>{i}
      </CalendarDay>
    );

    if ((i + firstDayOfMonth) % 7 === 0 || i === numDaysInMonth) {
      dates.push(<tr key={`week-${dates.length}`}>{dayCells}</tr>);
      dayCells = [];
    }
  }

  // 캘린더 마지막 주가 7일 미만일 경우, 남은 칸을 빈 칸으로 채웁니다.
  while (dayCells.length < 7) {
    dayCells.push(<CalendarDay key={`empty-end-${dayCells.length}`}></CalendarDay>);
  }
  if (dayCells.length) {
    dates.push(<tr key={`week-${dates.length}`}>{dayCells}</tr>);
  }

  return dates;
};

const HomePage: React.FC = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // JavaScript에서 월은 0부터 시작
  const currentMonthLetter = monthNames[currentMonth];

  const handleDayClick = (day: number) => {
    // 날짜 클릭 시의 로직, 예: console.log(day) 또는 라우팅
    console.log(`Clicked on day: ${day}`);
  };

  const dates = generateCalendarDates(currentYear, currentMonth, handleDayClick);

  return (
    <div>
      <Title>{currentMonthLetter}</Title>
      <CalendarTable>
        <thead>
          <tr>
            {["/SUN", "/MON", "/TUE", "/WED", "/THU", "/FRI", "/SAT"].map((day) => (
              <CalendarDayHeader key={day}>{day}</CalendarDayHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates}
        </tbody>
      </CalendarTable>
    </div>
  );
};

export default HomePage;
