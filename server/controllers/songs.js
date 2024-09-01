const Song = require("../models/Song");

const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json({ song });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).json({ count: songs.length, songs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSong = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByIdAndUpdate(id, req.body, { new: true });

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ song });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSong = async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully", song });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
};
