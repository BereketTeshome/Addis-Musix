/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongsRequest,
  fetchFavoriteSongsRequest,
  toggleFavorite,
} from "../features/songsSlice.jsx";
import { css } from "@emotion/react";
import Loader from "../components/Loader";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Songs = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { songs, loading, error, favoriteSongs } = useSelector(
    (state) => state.songs
  );

  const cookie = new Cookies();
  const token = cookie.get("user_token");
  const uploadedBy = jwtDecode(token).userId;

  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(fetchFavoriteSongsRequest(uploadedBy));
  }, [dispatch, uploadedBy]);

  const handleSongClick = (song) => {
    setSelectedSong(selectedSong === song ? null : song);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFavoriteClick = async (song) => {
    const {
      _id: songId,
      title,
      artist,
      album,
      genre,
      releaseDate,
      coverImageUrl,
    } = song;

    await axios.post("http://localhost:3001/api/song/favorite", {
      songId,
      title,
      artist,
      album,
      genre,
      releaseDate,
      coverImageUrl,
      uploadedBy,
    });

    dispatch(toggleFavorite(song._id));
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm) ||
      song.genre.toLowerCase().includes(searchTerm)
  );

  if (loading) return <Loader />;
  if (error) return <p css={errorStyle}>Error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song or artist..."
        value={searchTerm}
        onChange={handleSearchChange}
        css={searchInputStyle}
      />
      <div css={songsContainerStyle}>
        {filteredSongs.map((song) => (
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
              {token && (
                <IconButton
                  aria-label="add to favorites"
                  css={favoriteIconStyle}
                >
                  {favoriteSongs.some((fav) => fav.songId === song._id) ? (
                    <FavoriteIcon css={favoriteFilledStyle} />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      css={favoriteBorderStyle}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent song click event
                        handleFavoriteClick(song);
                      }}
                    />
                  )}
                </IconButton>
              )}
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
const searchInputStyle = css`
  width: auto;
  padding: 15px;
  font-size: 18px;
  border-radius: 8px;
  margin: 20px 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  outline: none;
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const songsContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px;
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

const favoriteBorderStyle = css`
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
  min-height: 90vh;
`;

export default Songs;
