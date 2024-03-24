import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SearchImg from "../assets/images/search.png"; 
import diaryData from '../data/Diary.json';
import Pagination from "../assets/pagination/Pagination";

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
  font-family: 'PPMonumentExtended', sans-serif;
  font-weight: normal;
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
  border: 1px solid #ACACAC;
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

const DropdownContent = styled.div`
  width: 150px;
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 103px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
`;

const showDropdownContent = (show: boolean): string => {
  return show ? 'block' : 'none';
};

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
  background-size: 13px 13px;ƒ
  border-radius: 5px;
  border: none; 
  outline: none;
`;

const Divider = styled.hr`
  border: none;
  width: 1274px;
  height: 1px;
  background-color: #C4C4C4;
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

const DiaryEntry = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #C4C4C4;
  padding-top: 25px;
  padding-bottom: 25px;
`;

const DiaryEntryTitle = styled.h2`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 24px;
  color: #333333;
  letter-spacing: -0.5px;
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
  color: #4B4B4B;
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

const DiaryPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<string>("최신순");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredDiaries, setFilteredDiaries] = useState(diaryData.DiaryList); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let sortedAndFiltered = [...diaryData.DiaryList]
      .filter(diary => 
        diary.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        diary.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "최신순") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
      });

    setFilteredDiaries(sortedAndFiltered);
  }, [sortOrder, searchQuery]);

  const lastDiaryIndex = currentPage * itemsPerPage;
  const firstDiaryIndex = lastDiaryIndex - itemsPerPage;
  const currentDiaries = filteredDiaries.slice(firstDiaryIndex, lastDiaryIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDropdownItemClick = (order: string) => {
    setSortOrder(order);
    setDropdownOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <PageContainer>
      <Header>
        <Title>MY DIARIES</Title>
        <SearchBarContainer>
          <DropdownContainer>
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              {sortOrder} <TriangleIcon />
            </DropdownButton>
            <DropdownContent style={{ display: showDropdownContent(dropdownOpen) }}>
              <DropdownItem onClick={() => handleDropdownItemClick("최신순")}>최신순</DropdownItem>
              <DropdownItem onClick={() => handleDropdownItemClick("오래된순")}>오래된순</DropdownItem>
            </DropdownContent>
          </DropdownContainer>
          <SearchBar placeholder="Search" onChange={handleSearchChange} />
        </SearchBarContainer>
      </Header>
      <Divider />
      <DiaryEntriesContainer>
        {currentDiaries.map((entry, index) => (
          <React.Fragment key={entry.id}>
            <DiaryEntry>
              <DiaryTextContainer>
                <DiaryEntryDate>{entry.createdAt}</DiaryEntryDate>
                <DiaryEntryTitle>{entry.title}</DiaryEntryTitle>
                <DiaryEntryContent>{entry.content}</DiaryEntryContent>
              </DiaryTextContainer>
              {entry.image && <DiaryImage src={entry.image} alt="Diary entry" />}
            </DiaryEntry>
           
          </React.Fragment>
        ))}
      </DiaryEntriesContainer>
      <Pagination 
        currentPage={currentPage}
        totalPages={Math.ceil(filteredDiaries.length / itemsPerPage)}
        onPageChange={paginate}
      />
    </PageContainer>
  );
};

export default DiaryPage;
