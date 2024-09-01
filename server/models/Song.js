const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "pop",
        "rock",
        "hip-hop",
        "jazz",
        "classical",
        "country",
        "electronic",
        "rap",
      ],
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    coverImageUrl: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SongSchema.index({
  title: "text",
  artist: "text",
});

module.exports = mongoose.model("Song", SongSchema);
