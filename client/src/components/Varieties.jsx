/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Varities = () => {
  // Sample data for genres
  const genres = [
    {
      type: "Rock",
      image: "/Group 2.png",
      description:
        "Feel the energy of Rock music with powerful guitars and drums.",
    },
    {
      type: "Jazz",
      image:
        "https://livedemo00.template-help.com/wt_51547/images/music-style-8-39x54.png",
      description: "Experience the smooth and soulful sound of Jazz music.",
    },
    {
      type: "Hip Hop",
      image:
        "https://livedemo00.template-help.com/wt_51547/images/music-style-6-31x50.png",
      description: "Groove to the beat of Hip Hop with dynamic rhythms.",
    },
    {
      type: "Classical",
      image:
        "https://livedemo00.template-help.com/wt_51547/images/music-style-4-53x45.png",
      description: "Enjoy the timeless melodies of Classical music.",
    },
    {
      type: "Pop",
      image:
        "https://livedemo00.template-help.com/wt_51547/images/music-style-5-51x48.png",
      description: "Get into the upbeat and catchy tunes of Pop music.",
    },
    {
      type: "Blues",
      image:
        "https://livedemo00.template-help.com/wt_51547/images/music-style-1-49x49.png",
      description: "Feel the deep emotions of Blues with its soulful melodies.",
    },
    {
      type: "Reggae",
      image:
        "https://livedemo00.template-help.com/wt_51547/images/music-style-3-37x46.png",
      description:
        "Vibe with the relaxed rhythms and positive vibes of Reggae.",
    },
    {
      type: "Electronic",
      image:
        "https://livedemo00.template-help.com/wt_51547/images/music-style-2-47x56.png",
      description: "Explore the futuristic sounds of Electronic music.",
    },
  ];

  return (
    <div css={containerStyle} id="varietySection">
      <h2 css={headerStyle}>
        A Variety of Music Genres at{" "}
        <span css={highlightStyle}>Addis-Musix</span>
      </h2>
      <p css={paragraphStyle}>
        Discover a diverse range of music genres that cater to every mood and
        taste. Whether you're into Rock, Jazz, Hip Hop, or Classical,
        Addis-Musix has something for everyone.
      </p>
      <div css={gridStyle}>
        {genres.map((genre) => (
          <div key={genre.type} css={boxStyle}>
            <img
              src={genre.image}
              alt={`${genre.type} icon`}
              css={imageStyle}
            />
            <h3 css={genreTitleStyle}>{genre.type}</h3>
            <p css={genreDescriptionStyle}>{genre.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Emotion CSS Styles
const containerStyle = css`
  padding: 20px;
  text-align: center;
  margin-top: 80px;
`;

const headerStyle = css`
  font-size: 24px;
  margin-bottom: 10px;
`;

const highlightStyle = css`
  color: #ff6347;
  font-size: 2.4rem;
  font-style: italic;
`;

const paragraphStyle = css`
  font-size: 16px;
  margin-bottom: 20px;
  padding: 0px 80px;

  @media (max-width: 568px) {
    padding: 0px 0px;
  }
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const boxStyle = css`
  border: 1px solid #ddd;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  background: #fff;

  &:hover {
    transform: translateY(-5px);
  }
`;

const imageStyle = css`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const genreTitleStyle = css`
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
`;

const genreDescriptionStyle = css`
  font-size: 14px;
  color: #666;
`;

export default Varities;
