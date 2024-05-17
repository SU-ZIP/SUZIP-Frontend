import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const SliderContainer = styled.div`
  width: auto;
  overflow: hidden;
  margin: 10vh 0 10vh 0;
  padding: 5vh 0 10vh 0;
`;

const SliderContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-out;
`;

const Slide = styled.div`
  flex: 0 0 auto;
  width: 674px;
  height: 792px;
  background-color: #ddd;
  border-radius: 20px;
  margin-right: 74px;
  box-shadow:
    0 0px 50px 0 rgba(0, 0, 0, 0.05),
    0 6px 50px 0 rgba(0, 0, 0, 0.05); // 그림자 추가
`;

const Slider2: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const { top } = sliderRef.current.getBoundingClientRect();
        const { innerHeight } = window;
        const diff = top - innerHeight;

        if (diff < 0) {
          sliderRef.current.style.transform = `translateX(${diff}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SliderContainer ref={sliderRef}>
      <SliderContent>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
        <Slide>Slide 3</Slide>
        <Slide>Slide 4</Slide>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
        <Slide>Slide 3</Slide>
        <Slide>Slide 4</Slide>
      </SliderContent>
    </SliderContainer>
  );
};

export default Slider2;
