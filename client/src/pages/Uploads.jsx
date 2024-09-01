/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import EditSongDialog from "../components/EditSongDialog ";
import NotFound from "../components/NotFound";

const Uploads = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(null);
  const cookie = new Cookies();
  const token = cookie.get("user_token");
  const userId = jwtDecode(token).userId;

  const fetchUploads = async () => {
    try {
      const response = await axios.get(
        "https://addis-musix-backend.vercel.app/api/song/get"
      );
      const uploadedSongs = response.data.songs.filter(
        (song) => song.uploadedBy === userId
      );
      setSongs(uploadedSongs);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, [token]);

  const handleEdit = (songId) => {
    setCurrentSongId(songId);
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentSongId(null);
    fetchUploads(); // Refresh the songs list after editing
  };

  const handleSongClick = (song) => {
    setSelectedSong(selectedSong === song ? null : song);
  };

  const handleDelete = async (songId) => {
    try {
      await axios.delete(
        `https://addis-musix-backend.vercel.app/api/song/delete/${songId}`
      );
      setSongs((prevSongs) => prevSongs.filter((song) => song._id !== songId));
    } catch (err) {
      console.error("Error deleting song:", err);
    }
  };

  if (songs.length < 1) {
    return <NotFound />;
  }

  if (error) return <p css={errorStyle}>Error: {error}</p>;

  return (
    <>
      <div>
        <div css={songsContainerStyle}>
          {songs.map((song) => (
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
                <div css={iconsStyle}>
                  <IconButton
                    aria-label="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(song._id);
                    }}
                  >
                    <EditIcon sx={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(song._id);
                    }}
                  >
                    <DeleteIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </div>
              </div>
              {selectedSong === song && (
                <div css={songDetailsStyle}>
                  <p>Album: {song.album}</p>
                  <p>Genre: {song.genre}</p>
                  <p>
                    Release Date: {new Date(song.releaseDate).toDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <EditSongDialog
        open={editDialogOpen}
        onClose={handleDialogClose}
        songId={currentSongId}
        onUpdate={fetchUploads} // Refresh the song list after update
      />
    </>
  );
};

// Emotion CSS Styles
const songsContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px;
  margin-bottom: 14vh;
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

const notFoundContainer = css`
  text-align: center;
  min-height: 90vh;
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

const iconsStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  color: #ff4081;
`;

const loadingStyle = css`
  color: #fff;
  text-align: center;
  margin-top: 20px;
`;

const errorStyle = css`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

export default Uploads;
