import React, { useRef } from "react";
import styled from "styled-components";

import BookRecommend from "../components/archives/BookRecommend";
import MovieRecommend from "../components/archives/MovieRecommend";
import MusicRecommend from "../components/archives/MusicRecommend";

const ArchiveContainer = styled.div``;
const ArchiveSection = styled.div``;

function ArchivePage() {
  const movieRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);

  const scrollToMovie = () => {
    if (movieRef.current) {
      movieRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToMusic = () => {
    if (musicRef.current) {
      musicRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ArchiveContainer>
      <ArchiveSection>
        <BookRecommend scrollToMovie={scrollToMovie} />
      </ArchiveSection>
      <ArchiveSection ref={movieRef}>
        <MovieRecommend scrollToMusic={scrollToMusic} />
      </ArchiveSection>
      <ArchiveSection ref={musicRef}>
        <MusicRecommend />
      </ArchiveSection>
    </ArchiveContainer>
  );
}

export default ArchivePage;
