/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import NotFound from "../components/NotFound";

const Favorites = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const cookie = new Cookies();
  const token = cookie.get("user_token");
  const userId = jwtDecode(token).userId;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `https://addis-musix-backend.vercel.app/api/song/favorites/${userId}`
        );
        setFavoriteSongs(response.data.favorite);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleSongClick = (song) => {
    setSelectedSong(selectedSong === song ? null : song);
  };

  const handleUnfavoriteClick = async (songId) => {
    try {
      const response = await axios.delete(
        `https://addis-musix-backend.vercel.app/api/song/favorite/${songId}`
      );
      if (response.status === 200) {
        setFavoriteSongs((prev) => prev.filter((song) => song._id !== songId));
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  if (favoriteSongs.length < 1) {
    return <NotFound />;
  }

  if (error) return <p css={errorStyle}>Error: {error}</p>;

  return (
    <div>
      <div css={songsContainerStyle}>
        {favoriteSongs.map((song) => (
          <div
            key={song._id}
            css={songStyle}
            onClick={() => handleSongClick(song)}
          >
            <div css={imageWrapperStyle}>
              <img
                src={song.coverImageUrl}
                alt={song.title}
                css={coverImageStyle}
              />
            </div>
            <div css={songInfoStyle}>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <IconButton
                aria-label="remove from favorites"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent song click event
                  handleUnfavoriteClick(song._id);
                }}
                css={favoriteIconStyle}
              >
                <FavoriteIcon css={favoriteFilledStyle} />
              </IconButton>
            </div>
            {selectedSong === song && (
              <div css={songDetailsStyle}>
                <p>Album: {song.album}</p>
                <p>Genre: {song.genre}</p>
                <p>Release Date: {new Date(song.releaseDate).toDateString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Emotion CSS Styles

const songsContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px;
  min-height: 80vh;
`;

const songStyle = css`
  background: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  color: #fff;
  max-width: 450px;
  max-height: 600px;

  &:hover {
    transform: translateY(-10px);
  }
`;

const imageWrapperStyle = css`
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 8px;
`;

const coverImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const songInfoStyle = css`
  margin-top: 10px;
  position: relative;

  h3 {
    font-size: 18px;
    margin: 5px 0;
  }

  p {
    font-size: 16px;
    color: #a0a0a0;
  }
`;

const favoriteIconStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  color: #ff4081;
`;

const favoriteFilledStyle = css`
  color: #ff4081;
`;

const songDetailsStyle = css`
  margin-top: 15px;
  font-size: 14px;
  color: #bbb;
  animation: slideDown 0.5s ease-in-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 500px;
    }
  }
`;

const errorStyle = css`
  color: red;
  text-align: center;
  margin-top: 20px;
  min-height: 80vh;
`;

export default Favorites;
