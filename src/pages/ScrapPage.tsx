import React, { useState } from 'react';
import styled from 'styled-components';

import Pagination from "../assets/pagination/Pagination";

const PageContainer = styled.div`
  padding: 20px;
  padding-bottom: 50px;
  max-width: 1600px; 
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-family: "PPMonumentExtended";
  color: #333333;
  display: block;
  margin-bottom: 2.5vh;
  width: fit-content;
  margin-right: 30px;
`;

const SubTitle = styled.h2`
  font-family: "PPMonumentExtended";
  font-weight: normal;
  font-size: 23px;
  color: #666666;
  margin-bottom: 25px;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  background-color: transparent;
  border: none;
  font-family: "PPMonumentExtended";
  font-size: 16px;
  color: #333333;
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'light')};
  &:focus {
    outline: none;
  }
  margin-left: 10px;
  margin-right: 10px;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 45px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 502px;
  height: 340px;
  background-color: #F2F2F2;
`;

const Image = styled.img<{ category: 'Book' | 'Movie' | 'Music' }>`
  width: ${({ category }) => {
    switch (category) {
      case 'Book': return '199px';
      case 'Movie': return '400px';
      case 'Music': return '242px';
      default: return '199px'; 
    }
  }};
  height: ${({ category }) => {
    switch (category) {
      case 'Book': return '280px';
      case 'Movie': return '207px';
      case 'Music': return '242px';
      default: return '280px'; 
    }
  }};
  object-fit: cover; // 이미지 비율을 유지하면서 컨테이너에 맞춤
`;

interface ScrapItem {
  id: number;
  category: 'Book' | 'Movie' | 'Music';
  imageUrl: string;
}

const scrapItems: ScrapItem[] = [
  { id: 1, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+1' },
  { id: 2, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+2' },
  { id: 3, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+3' },
  { id: 4, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+4' },
  { id: 5, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+5' },
  { id: 6, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+6' },
  { id: 7, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+7' },
  { id: 8, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+8' },
  { id: 9, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+9' },
  { id: 10, category: 'Book', imageUrl: 'https://via.placeholder.com/150?text=Book+Cover+9' },
  { id: 11, category: 'Movie', imageUrl: 'https://via.placeholder.com/150?text=Movie+Poster+1' },
  { id: 12, category: 'Music', imageUrl: 'https://via.placeholder.com/150?text=Music+Poster+1' },
];

const categories = ['Book', 'Movie', 'Music'];

const itemsPerPage = 9;

const ScrapPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Book');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredItems = scrapItems.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <PageContainer>
      <Header>
      <Title>Scrap Lists</Title>
        {categories.map((category, index) => (
          <>
           <NavButton
            key={category}
            isActive={selectedCategory === category}
            onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
            }}
            >
            {category}
            </NavButton>
            {index < categories.length - 1 && <span style={{ margin: '0 10px' }}>|</span>}
          </>
        ))}
      </Header>
      <SubTitle>{selectedCategory}</SubTitle>
      <GridContainer>
        <Grid>
        {currentItems.map((item) => (
            <Item key={item.id}>
            <Image 
                src={item.imageUrl} 
                alt={`${item.category} cover`} 
                category={item.category} 
            />
            </Item>
        ))}
        </Grid>
        </GridContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </PageContainer>
  );
};

export default ScrapPage;
