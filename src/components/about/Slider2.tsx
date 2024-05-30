import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Slide1 from "../../assets/images/slide1.png";
import Slide2 from "../../assets/images/slide2.png";
import Slide3 from "../../assets/images/slide3.png";
import Slide4 from "../../assets/images/slide4.png";

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 10vh 0;
  padding: 5vh 0 10vh 0;
`;

const SliderContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-out;
`;

const Slide = styled.div<{ bgImage: string }>`
  flex: 0 0 auto;
  width: 674px;
  height: 792px;
  background-color: #ddd;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  margin-right: 74px;
  box-shadow:
    0 0px 50px 0 rgba(0, 0, 0, 0.05),
    0 6px 50px 0 rgba(0, 0, 0, 0.05);
`;

const Slider2: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current && contentRef.current) {
        const { top } = sliderRef.current.getBoundingClientRect();
        const { innerHeight } = window;
        const diff = top - innerHeight;

        if (diff < 0) {
          const slides = contentRef.current.children;
          const slideWidth = slides[0].clientWidth + 74; // Slide width + margin-right
          const maxScroll = slideWidth * (slides.length / 2);

          const scrollPosition = Math.abs(diff);
          const newPosition = scrollPosition % maxScroll;

          contentRef.current.style.transition = "none";
          contentRef.current.style.transform = `translateX(-${newPosition}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slideImages = [
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide1,
    Slide2,
    Slide3,
    Slide4,
  ];

  return (
    <SliderContainer ref={sliderRef}>
      <SliderContent ref={contentRef}>
        {slideImages.map((image, index) => (
          <Slide key={index} bgImage={image} />
        ))}
      </SliderContent>
    </SliderContainer>
  );
};

export default Slider2;
