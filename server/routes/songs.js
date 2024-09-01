const express = require("express");
const {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
} = require("../controllers/songs");
const router = express.Router();

// Create a new song
router.post("/create", createSong);

// Get all songs
router.get("/get", getSongs);

// Update a song by ID
router.put("/edit/:id", updateSong);

// Delete a song by ID
router.delete("/delete/:id", deleteSong);

module.exports = router;
