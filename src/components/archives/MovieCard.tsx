import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dummy from "../../data/ContentData.json";

type Movie = {
  itemId: number;
  name: string;
  content: string;
  image: string;
  genre: string;
  dType: string;
};

type MovieCardProps = {
  movie: Movie;
};

const CardContainer = styled.div`
  width: 20vw;
  height: 60vh;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const MovieCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-position: center;
`;

const MovieInfo = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  top: 0;
  &:hover {
    opacity: 1;
  }
`;

const MovieInfoContent = styled.div`
  padding-left: 1vw;
  padding-right: 1vw;
  text-align: left;
`;

const MovieTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.2rem;
  display: block;
  margin: 1vw;
  text-align: left;
`;

const MovieContent = styled.div`
  font-family: "Pretendard";
  font-weight: 100;
  font-size: 1rem;
  display: block;
  margin: 1vw;
  line-height: 170%;
  text-align: justify;
`;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <CardContainer>
      <MovieCardContainer>
        <MovieImage src={movie.image} alt={movie.name} />
        <MovieInfo>
          <MovieInfoContent>
            <MovieTitle>{movie.name}</MovieTitle>
            <MovieContent>{movie.content}</MovieContent>
          </MovieInfoContent>
        </MovieInfo>
      </MovieCardContainer>
    </CardContainer>
  );
};

export default MovieCard;
