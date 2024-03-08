import React from 'react';
import styled from "styled-components";

// 기존 Title 컴포넌트

const CalendarContainer = styled.div`
    margin-left: 10rem;
`;

const Title = styled.h1`
    font-family: 'PPMonumentExtended', sans-serif;
`;

// 새로운 DayHeader 컴포넌트
const DayHeader = styled.th`
    font-family: 'PPMonumentExtended';
    font-weight: medium;
`;

const HomePage: React.FC = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();
    const currentMonth = monthNames[currentDate.getMonth()];

    const renderCalendar = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <DayHeader>/Sun</DayHeader>
                        <DayHeader>/Mon</DayHeader>
                        <DayHeader>/Tue</DayHeader>
                        <DayHeader>/Wed</DayHeader>
                        <DayHeader>/Thu</DayHeader>
                        <DayHeader>/Fri</DayHeader>
                        <DayHeader>/Sat</DayHeader>
                    </tr>
                </thead>
                <tbody>
                    {/* 캘린더 날짜 셀을 여기에 추가합니다. */}
                </tbody>
            </table>
        );
    };

    return (
        <CalendarContainer>
            <Title>{currentMonth}</Title> {/* 현재 월을 제목으로 표시 */}
            {renderCalendar()} {/* 캘린더를 렌더링 */}
        </CalendarContainer>
    );
}

export default HomePage;
