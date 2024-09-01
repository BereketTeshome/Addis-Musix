/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { motion, useAnimation } from "framer-motion";
import { css, keyframes } from "@emotion/react";

function Hero() {
  const controls = useAnimation();
  const [elementIsVisible, setElementIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (elementIsVisible) {
        controls.start("visible").then(() => {
          controls.start("hidden");
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [elementIsVisible, controls]);

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

  const bgVariants = {
    hidden: { left: "19rem", transform: "translateZ(-200px) scale(0.9)" },
    visible: { left: "7rem", transform: "translateZ(0px) scale(1)" },
  };
  const musicPlayerVariants = {
    hidden: { left: "235px", transform: "translateZ(-150px) scale(0.9)" },
    visible: { left: "295px", transform: "translateZ(0px) scale(1)" },
  };
  const rectVariants = {
    hidden: { left: "13rem", transform: "translateZ(-100px) scale(0.9)" },
    visible: { left: "11rem", transform: "translateZ(0px) scale(1)" },
  };
  const heartVariants = {
    hidden: { left: "12.5rem", transform: "translateZ(-50px) scale(0.9)" },
    visible: { left: "9rem", transform: "translateZ(0px) scale(1)" },
  };

  const headerButton = css`
    padding: 7px 25px;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    border: none;
    background-color: #fd7019;
    box-shadow: 2px 2px 13px 4px #fd7019;
    text-decoration: none;
    margin-top: 30px;

    &:hover {
      box-shadow: 2px 2px 25px 4px #fd7019;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
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

    @media (max-width: 850px) {
      max-width: 80%;
    }
  `;

  return (
    <VisibilitySensor
      onChange={(isVisible) => setElementIsVisible(isVisible)}
      partialVisibility
    >
      <>
        <div
          css={css`
            background-color: #081730;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 5rem;
            border-radius: 0 0 5rem 5rem;
            width: 100%;
            height: 38rem;
            position: relative;
            overflow-x: hidden;
            z-index: 3;

            @media (max-width: 800px) {
              flex-direction: column;
              padding: 1rem;
            }
          `}
        >
          {/* Left side */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              height: 100%;
              font-size: 3rem;
              width: 50%;

              @media (max-width: 850px) {
                font-size: 2rem;
                text-align: center;
                align-items: center;
                width: 100%;
              }
            `}
          >
            <div css={imageContainerStyles}>
              <img
                src="/header-img.png"
                alt="header img"
                css={css`
                  width: 80%;

                  @media (min-width: 850px) {
                    display: none;
                  }
                `}
              />
            </div>
            <span
              css={css`
                color: #fff;
              `}
            >
              Experience The
            </span>
            <span
              css={css`
                color: #fd7019;
              `}
            >
              <b>Best Quality Music</b>
            </span>
            <span
              css={css`
                font-size: 15px;
                color: #525d6e;

                @media (max-width: 768px) {
                  text-align: center;
                }
              `}
            >
              Discover new artists, listen to the latest hits, and connect with
              your favorite tunes. <br /> <br /> <br />
              <a href="#varietySection" css={headerButton}>
                Explore
              </a>
            </span>
          </div>
          {/* Right side */}
          <div
            css={css`
              position: relative;
              width: 70%;
              perspective: 1000px;

              @media (max-width: 850px) {
                display: none;
              }
            `}
          >
            <motion.img
              variants={bgVariants}
              initial="hidden"
              animate={controls}
              transition={{ duration: 1.5, type: "ease-out" }}
              src="./backgraphics.png"
              alt="mobile img"
              css={css`
                position: absolute;
                top: -8rem;
                left: 19rem;
                width: 90%;
                transform-style: preserve-3d;
              `}
            />
            <img
              src="./p1.png"
              alt="header1"
              css={css`
                position: absolute;
                top: -15rem;
                height: 29rem;
                left: 13rem;
                transform-style: preserve-3d;
              `}
            />
            <motion.img
              variants={musicPlayerVariants}
              initial="hidden"
              animate={controls}
              transition={{ duration: 1.5, type: "ease-out" }}
              src="./p2.png"
              alt="header2"
              css={css`
                position: absolute;
                right: 400px;
                top: 44px;
                width: 210px;
                transform-style: preserve-3d;
              `}
            />
            <motion.img
              variants={rectVariants}
              initial="hidden"
              animate={controls}
              transition={{ duration: 1.5, type: "ease-out" }}
              src="./p3.png"
              alt="header3"
              css={css`
                position: absolute;
                width: 4.2rem;
                left: 12rem;
                top: 8.7rem;
                transform-style: preserve-3d;
              `}
            />
            <motion.img
              variants={heartVariants}
              initial="hidden"
              animate={controls}
              transition={{ duration: 1.5, type: "ease-out" }}
              src="./p4.png"
              alt="header4"
              css={css`
                position: absolute;
                width: 5rem;
                left: 13.3rem;
                top: 7.7rem;
                transform-style: preserve-3d;
              `}
            />
          </div>
        </div>
        <span
          css={css`
            position: relative;
            top: -40px;
            z-index: 40;
            display: flex;
            justify-content: center;
          `}
        >
          <img src="Group 9.png" alt="navigate.png" width={200} />
        </span>
      </>
    </VisibilitySensor>
  );
}

export default Hero;
