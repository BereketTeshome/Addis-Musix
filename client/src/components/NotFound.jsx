/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const NotFound = () => {
  return (
    <div css={notFoundContainer}>
      <img src="/notFound.png" alt="not found image" css={notFoundImage} />
    </div>
  );
};

const notFoundContainer = css`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const notFoundImage = css`
  width: 60%;

  @media (max-width: 868px) {
    width: 100%;
  }
`;

export default NotFound;
