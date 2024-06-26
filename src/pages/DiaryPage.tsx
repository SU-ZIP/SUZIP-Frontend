import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import SearchImg from "../assets/images/search.png";
import Pagination from "../assets/pagination/Pagination";
import { Link } from 'react-router-dom';
import ErrorImg from '../assets/images/error.png';
import config from '../assets/path/config';

const PageContainer = styled.div`
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1274px;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "PPMonumentExtended", sans-serif;
  font-weight: 200;
  font-size: 32px;
  color: #333333;
`;

const DropdownContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
  position: relative;
`;

const DropdownButton = styled.div`
  width: 90px;
  height: 34px;
  background-color: #fff;
  color: #535353;
  border-radius: 5px;
  border: 1px solid #acacac;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  padding-left: 3px;
  cursor: pointer;
  position: relative;
`;

const TriangleIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #535353;
  position: absolute;
  right: 15px;
`;

const DropdownContent = styled.div<{ show: boolean }>`
  width: 150px;
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  min-width: 103px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0;
`;

const DropdownItem = styled.div`
  font-family: "Pretendard";
  color: #333333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBar = styled.input`
  width: 212px;
  height: 34px;
  font-family: "Pretendard";
  font-size: 15px;
  padding-left: 35px;
  background-color: #EAEAEA;
  background-image: url(${SearchImg});
  background-position: 10px center;
  background-repeat: no-repeat;
  background-size: 13px;
  border-radius: 5px;
  border: none;
  outline: none;
`;

const Divider = styled.hr`
  border: none;
  width: 1274px;
  height: 1px;
  background-color: #c4c4c4;
  margin-bottom: 20px;
  margin-top: -10px;
`;

const DiaryEntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1274px;
  margin-top: -20px;
`;

const DiaryEntry = styled(Link)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #c4c4c4;
  padding-top: 25px;
  padding-bottom: 25px;
  text-decoration: none;
  color: inherit;
`;

const DiaryEntryTitle = styled.h2`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 24px;
  color: #333333;
  letter-spacing: -0.5px;
  margin-top: 2.5vh;
  margin-left: -2px;
`;

const DiaryEntryDate = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  color: #747474;
  font-size: 14px;
  margin-bottom: -15px;
`;

const DiaryEntryContent = styled.p`
  font-family: "Pretendard";
  font-weight: 500;
  color: #4b4b4b;
  line-height: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 텍스트를 4줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DiaryTextContainer = styled.div`
  margin-top: 20px;
  width: 80%;
`;

const DiaryImage = styled.img`
  width: 198px;
  height: 198px;
  object-fit: cover;
  object-position: center;
`;

const ErrorMsg = styled.p`
  font-family: "Pretendard";
  font-size: 18px;
  color: #727272;
`;

interface DiaryEntry {
  diaryId: number;
  title: string;
  emotion: string;
  color: string;
  content: string;
  image?: string;
  date: string;
}

interface DiaryApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    diaryList: DiaryEntry[];
    listSize: number;
    totalPage: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
  }
}

const DiaryPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<string>("최신순");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [filteredDiaries, setFilteredDiaries] = useState<DiaryEntry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 5;

  const fetchDiaries = async () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: currentPage, sortOrder: sortOrder, searchQuery: searchQuery }
    };
    try {
      const response = await axios.get<DiaryApiResponse>('http://localhost:8080/api/diary', config);
      if (response.data.isSuccess) {
        setDiaries(response.data.result.diaryList);
        setTotalPages(response.data.result.totalPage);
      }
    } catch (error) {
      console.error('Failed to fetch diaries:', error);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [currentPage, sortOrder, searchQuery]);

  useEffect(() => {
    const filtered = diaries.filter(diary =>
      diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diary.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFiltered = filtered.sort((a, b) => sortOrder === "최신순" ?
      new Date(b.date).getTime() - new Date(a.date).getTime() :
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setFilteredDiaries(sortedFiltered);
  }, [searchQuery, diaries, sortOrder]);

  const handleDropdownItemClick = (order: string) => {
    setSortOrder(order);
    setDropdownOpen(false);
    setCurrentPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to first page on search query change
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber - 1);

  return (
    <PageContainer>
      <Header>
        <Title>MY DIARIES</Title>
        <SearchBarContainer>
          <DropdownContainer>
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              {sortOrder} <TriangleIcon />
            </DropdownButton>
            <DropdownContent show={dropdownOpen}>
              <DropdownItem onClick={() => handleDropdownItemClick("최신순")}>최신순</DropdownItem>
              <DropdownItem onClick={() => handleDropdownItemClick("오래된순")}>오래된순</DropdownItem>
            </DropdownContent>
          </DropdownContainer>
          <SearchBar placeholder="검색" onChange={handleSearchChange} />
        </SearchBarContainer>
      </Header>
      <Divider />
      <DiaryEntriesContainer>
        {filteredDiaries.length > 0 ? (
          filteredDiaries.map(entry => (
            <DiaryEntry to={`/diary/${entry.diaryId}`} key={entry.diaryId}>
              <DiaryTextContainer>
                <DiaryEntryDate>{entry.date}</DiaryEntryDate>
                <DiaryEntryTitle>{entry.title}</DiaryEntryTitle>
                <DiaryEntryContent>{entry.content}</DiaryEntryContent>
              </DiaryTextContainer>
              {entry.image && <DiaryImage src={entry.image} alt="Diary entry" />}
            </DiaryEntry>
          ))
        ) : (
          <div style={{ marginTop: '15vh', textAlign: 'center', width: '100%' }}>
            <img src={ErrorImg} alt="No Entries" style={{ width: '42px', height: '42px' }} />
            <ErrorMsg>검색 결과가 존재하지 않아요.</ErrorMsg>
          </div>
        )}
      </DiaryEntriesContainer>
      {filteredDiaries.length > 0 && (
        <Pagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      )}
    </PageContainer>
  );
};

export default DiaryPage;
