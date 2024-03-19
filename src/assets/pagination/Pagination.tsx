import React from 'react';
import styled from 'styled-components';

import prevPage from "../images/prevpage.png";
import nextPage from "../images/nextpage.png";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const PageButton = styled.button<{ isSelected?: boolean }>`
  background-color: ${(props) => (props.isSelected ? 'black' : 'transparent')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: none;
  cursor: pointer;
  margin: 0 5px;
  width: 32px;
  height: 32px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: "Pretendard";
  font-weight: 500;

  &:hover {
    background-color: ${(props) => (props.isSelected ? 'black' : '#f0f0f0')};
  }
`;

const ArrowImage = styled.img`
  width: 20px; // 원하는 너비로 조절
  height: 20px; // 원하는 높이로 조절
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
        <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ArrowImage src={prevPage} alt="Previous page" />
        </PageButton>
        {Array.from({ length: totalPages }, (_, index) => (
            <PageButton key={index + 1} isSelected={currentPage === index + 1} onClick={() => onPageChange(index + 1)}>
            {index + 1}
            </PageButton>
        ))}
        <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <ArrowImage src={nextPage} alt="Next page" />
        </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
