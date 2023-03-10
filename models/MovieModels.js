const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  videos: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  view: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //   required: true
  },
  selectedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Movie", movieSchema);
