/** @jsxImportSource @emotion/react */
import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Stack,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { css } from "@emotion/react";
import UploadVector from "/upload.png";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const Upload = () => {
  const cookie = new Cookies();
  const token = cookie.get("user_token");
  const uploader = jwtDecode(token).userId;
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "-",
    genre: "",
    releaseDate: "",
    coverImageUrl: "",
    uploadedBy: uploader,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadData = {
        ...formData,
        coverImageUrl:
          formData.coverImageUrl ||
          "https://firebasestorage.googleapis.com/v0/b/test-13c4e.appspot.com/o/No%20user%20profile%20picture.jpg?alt=media&token=fe5793bb-58bb-4b9c-bf81-173cd0006d05",
      };
      await axios.post("http://localhost:3001/api/song/create", uploadData);
      alert("Song uploaded successfully!");
      setFormData({
        title: "",
        artist: "",
        album: "-",
        genre: "",
        releaseDate: "",
        coverImageUrl: "",
        uploadedBy: "",
      });
    } catch (error) {
      console.error("Error uploading song:", error);
      alert("Failed to upload song.");
    }
  };

  return (
    <Box css={backgroundStyle}>
      <Container maxWidth="lg" sx={{ my: 7 }}>
        <Typography variant="h4" align="center" css={titleStyle} gutterBottom>
          Upload a Song
        </Typography>
        <Box css={uploadContainerStyle}>
          <Box css={vectorContainerStyle}>
            <img
              src={UploadVector}
              alt="Upload Illustration"
              css={vectorStyle}
            />
          </Box>
          <Box css={formContainerStyle}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Artist"
                  name="artist"
                  fullWidth
                  value={formData.artist}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Album"
                  name="album"
                  fullWidth
                  value={formData.album}
                  onChange={handleChange}
                />
                <FormControl fullWidth required>
                  <InputLabel>Genre</InputLabel>
                  <Select
                    label="Genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  >
                    <MenuItem value="electronic">Electronic</MenuItem>
                    <MenuItem value="country">Country</MenuItem>
                    <MenuItem value="classical">Classical</MenuItem>
                    <MenuItem value="jazz">Jazz</MenuItem>
                    <MenuItem value="hip-hop">Hip-Hop</MenuItem>
                    <MenuItem value="rock">Rock</MenuItem>
                    <MenuItem value="pop">Pop</MenuItem>
                    <MenuItem value="rap">Rap</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Release Date"
                  name="releaseDate"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formData.releaseDate}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Copy Paste Image Address URL of the Artist"
                  name="coverImageUrl"
                  fullWidth
                  value={formData.coverImageUrl}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Upload Song
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Emotion CSS Styles
const backgroundStyle = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const titleStyle = css`
  color: #fff;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: cursive;
  color: #fd7019;
`;

const uploadContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background-color: lightBlue;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const vectorContainerStyle = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 960px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const vectorStyle = css`
  max-width: 100%;
  height: auto;
`;

const formContainerStyle = css`
  flex: 2;
  width: 100%;
`;

export default Upload;
