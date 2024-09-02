/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { changeComponent } from "../features/ComponentSlice";

const AccessMusics = () => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(changeComponent("Songs"));
  };

  return (
    <div css={containerStyle}>
      <h2 css={headerStyle}>Unlimited Access to Many Tracks</h2>
      <p css={paragraphStyle}>
        Dive into a vast collection of songs spanning all genres, moods, and
        styles. Experience high-quality streaming anytime, anywhere!
      </p>
      <button css={buttonStyle} onClick={handleNavigate}>
        Explore Songs
      </button>
    </div>
  );
};

// Emotion CSS Styles
const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 170px 0px;
  padding: 30px;
  text-align: center;
  background: linear-gradient(135deg, #0a183d, #df701b);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const headerStyle = css`
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: bold;
  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const paragraphStyle = css`
  font-size: 16px;
  margin-bottom: 20px;
  color: #f8f9fa;
  line-height: 1.6;
  animation: slideIn 2s ease-in-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const buttonStyle = css`
  padding: 12px 24px;
  background-color: #fff;
  color: #ff7e5f;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  animation: bounce 2s infinite;

  &:hover {
    background-color: #f8f9fa;
    transform: scale(1.05);
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

export default AccessMusics;
