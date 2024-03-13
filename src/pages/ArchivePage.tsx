import React from "react";
import styled from "styled-components";
import BookRecommendation from "../components/archives/BookRecommend";
import MovieRecommend from "../components/archives/MovieRecommend";
import MusicRecommend from "../components/archives/MusicRecommend";

const ArchiveContainer = styled.div``;

function ArchivePage() {
  return (
    <ArchiveContainer>
      <BookRecommendation />
      <MovieRecommend />
      <MusicRecommend />
    </ArchiveContainer>
  );
}

export default ArchivePage;
