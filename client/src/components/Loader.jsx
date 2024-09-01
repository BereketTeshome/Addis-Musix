/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const loaderWrapperStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const loaderContainerStyles = css`
  position: relative;
  bottom: 1.5rem;
`;

const spinnerStyles = css`
  border-width: 4px;
  border-style: solid;
  border-color: #fd7019;
  border-top-color: transparent;
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const textStyles = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fd7019;
`;

const Loader = () => {
  return (
    <div css={loaderWrapperStyles}>
      <div css={loaderContainerStyles}>
        <div css={spinnerStyles}></div>
        <div css={textStyles}>ADDIS</div>
      </div>
    </div>
  );
};

export default Loader;
