/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaFacebook, FaTwitter, FaInstagram, FaMusic } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changeComponent } from "../features/ComponentSlice";
const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer css={footerStyle}>
      <div css={footerContentStyle}>
        {/* Logo Section */}
        <div css={logoStyle}>
          <img src="/music icon.png" alt="music logo" css={logo} />
          <span>Addis-MUSIX</span>
        </div>

        {/* Links Section */}
        <div css={linksContainerStyle}>
          <a
            href="/"
            css={linkStyle}
            onClick={() => dispatch(changeComponent("homePage"))}
          >
            Home
          </a>
          <a css={linkStyle} onClick={() => dispatch(changeComponent("Songs"))}>
            Songs
          </a>
          <a
            css={linkStyle}
            onClick={() => dispatch(changeComponent("Upload"))}
          >
            Upload
          </a>
        </div>

        {/* Social Media Icons */}
        <div css={socialIconsStyle}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook css={iconStyle} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter css={iconStyle} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram css={iconStyle} />
          </a>
        </div>

        {/* Paragraph Section */}
        <p css={paragraphStyle}>
          Discover a world of music with ADDIS-MUSIX. Stay tuned, stay
          connected, and let the rhythm take you away!
        </p>
      </div>
    </footer>
  );
};

// Emotion CSS Styles
const footerStyle = css`
  background-color: #0a183d;
  color: #fff;
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  margin-top: 100px;
  bottom: 0;
  width: 100%;
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

const footerContentStyle = css`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const logoStyle = css`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  gap: 10px;
  animation: bounceIn 1.5s ease-in-out;

  @keyframes bounceIn {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const linksContainerStyle = css`
  display: flex;
  gap: 20px;
  margin: 10px 0;
`;

const linkStyle = css`
  color: #f1f1f1;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ff6347;
  }
`;

const socialIconsStyle = css`
  display: flex;
  gap: 15px;
`;

const iconStyle = css`
  font-size: 20px;
  color: #f1f1f1;
  transition: transform 0.3s ease;

  &:hover {
    color: #ff6347;
    transform: scale(1.2);
  }
`;

const paragraphStyle = css`
  font-size: 14px;
  max-width: 400px;
  line-height: 1.6;
  color: #f1f1f1;
`;

const logo = css`
  width: 30px;
  margin-right: 10px;
`;

export default Footer;
