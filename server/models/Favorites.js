const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema(
  {
    songId: {
      type: String,
    },
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("favorites", FavSchema);
