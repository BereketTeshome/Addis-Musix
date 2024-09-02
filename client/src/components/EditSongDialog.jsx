/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const EditSongDialog = ({ open, onClose, songId, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    releaseDate: "",
    coverImageUrl: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (songId) {
      const fetchSongData = async () => {
        try {
          const response = await axios.get(
            `https://addis-musix-backend.vercel.app/api/song/edit/${songId}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching song data:", error);
        }
      };
      fetchSongData();
    }
  }, [songId]);

  useEffect(() => {
    const { title, artist, album, genre, releaseDate, coverImageUrl } =
      formData;
    setIsFormValid(
      title && artist && album && genre && releaseDate && coverImageUrl
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    try {
      await axios.put(
        `https://addis-musix-backend.vercel.app/api/song/edit/${songId}`,
        formData
      );
      onClose();
      onUpdate();
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Song</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Artist"
          name="artist"
          fullWidth
          value={formData.artist}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Album"
          name="album"
          fullWidth
          value={formData.album}
          onChange={handleChange}
          margin="normal"
        />
        <FormControl fullWidth margin="normal" required>
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
          margin="normal"
          required
        />
        <TextField
          label="Cover Image URL"
          name="coverImageUrl"
          fullWidth
          value={formData.coverImageUrl}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={!isFormValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSongDialog;
