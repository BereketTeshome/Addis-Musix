/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import musicImage from "../../public/header-img.png";

const zoomAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const headerContainerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  min-height: 100vh;
  background-color: #0a183d; /* New background color */

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const textContainerStyles = css`
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const titleStyles = css`
  font-size: 3rem;
  font-weight: bold;
  color: #fd7019;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const paragraphStyles = css`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #e0e6ed;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const imageContainerStyles = css`
  max-width: 50%;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    animation: ${zoomAnimation} 3.4s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const headerButton = css`
  padding: 7px 25px;
  color: white;
  border-radius: 25px;
  box-shadow: 1px 1px 5px 3px #08192d;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #fd7019;
  box-shadow: 2px 2px 13px 4px #fd7019;
  text-decoration: none;

  &:hover {
    box-shadow: 2px 2px 25px 4px #fd7019;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
`;

const Header = () => {
  return (
    <div css={headerContainerStyles}>
      <div css={textContainerStyles}>
        <h1 css={titleStyles}>Explore the World of Music</h1>
        <p css={paragraphStyles}>
          Dive into an expansive library of music from around the globe.
          Discover new artists, listen to the latest hits, and connect with your
          favorite tunes.
        </p>
        <a href="#varietySection" css={headerButton}>
          Explore
        </a>
      </div>
      <div css={imageContainerStyles}>
        <img src={musicImage} alt="Music Website Vector" />
      </div>
    </div>
  );
};

export default Header;
