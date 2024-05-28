import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Pagination from "../assets/pagination/Pagination";
import config from '../assets/path/config';

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
  font-weight: 200;
`;

const SubTitle = styled.h2`
  font-family: "PPMonumentExtended";
  font-weight: 200;
  font-size: 23px;
  color: #666666;
  margin-bottom: 25px;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  background-color: transparent;
  border: none;
  font-family: "PPMonumentExtended";
  font-size: 16px;
  color: ${({ isActive }) => (isActive ? '#33333' : '#9D9D9D')};
  cursor: pointer;
  font-weight: 200;
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
  position: relative;
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 502px;
  height: 340px;
  background-color: #F2F2F2;
  overflow: hidden;
  
  &:hover .overlay {
    display: flex;
  }
`;

const Image = styled.img<{ category: 'Book' | 'Movie' | 'Music' }>`
  width: ${({ category }) => {
    switch (category) {
      case 'Book': return '199px';
      case 'Movie': return '200px';
      case 'Music': return '242px';
      default: return '199px'; 
    }
  }};
  height: ${({ category }) => {
    switch (category) {
      case 'Book': return '280px';
      case 'Movie': return '300px';
      case 'Music': return '242px';
      default: return '280px'; 
    }
  }};
  object-fit: cover;
`;

const Overlay = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 1.15rem;
`;

interface ScrapItem {
    id: number;
    category: 'Book' | 'Movie' | 'Music';
    imageUrl: string;
}

const categories = ['Book', 'Movie', 'Music'];
const itemsPerPage = 9;

const ScrapPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Book');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scrapItems, setScrapItems] = useState<ScrapItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchScrapItems = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${config.API_URL}/api/scrap/${selectedCategory.toLowerCase()}s`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage - 1,
          },
        });
        if (response.data.isSuccess) {
          const items = response.data.result[`${selectedCategory.toLowerCase()}List`].map((item: any) => ({
            id: item[`${selectedCategory.toLowerCase()}Id`],
            category: selectedCategory,
            imageUrl: item.image,
          }));
          setScrapItems(items);
          setTotalPages(response.data.result.totalPage);
        } else {
          console.error('Failed to fetch scrap items:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching scrap items:', error);
      }
    };

    fetchScrapItems();
  }, [selectedCategory, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCancelScrap = async (itemId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.delete(`${config.API_URL}/api/scrap/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isSuccess) {
        setScrapItems(scrapItems.filter(item => item.id !== itemId));
      } else {
        console.error('Failed to cancel scrap:', response.data.message);
      }
    } catch (error) {
      console.error('Error canceling scrap:', error);
    }
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
          {scrapItems.map((item) => (
            <Item key={item.id}>
              <Image 
                src={item.imageUrl} 
                alt={`${item.category} cover`} 
                category={item.category as 'Book' | 'Movie' | 'Music'} 
              />
              <Overlay 
                className="overlay" 
                onClick={() => handleCancelScrap(item.id)}
              >
                스크랩 취소
              </Overlay>
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
