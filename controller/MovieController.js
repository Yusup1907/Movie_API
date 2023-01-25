const Movie = require("../models/MovieModels.js");
const Features = require("../utils/Features");

exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    if (!movie) {
      throw { code: 401, message: "movie create failed" };
    }

    res.status(201).json({
      success: true,
      movie,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

exports.getAllMovie = async (req, res) => {
  const resultPerPage = 8;
  const movieCount = await Movie.countDocuments();
  const feature = new Features(Movie.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const movie = await feature.query;
  res.status(200).json({
    success: true,
    movie,
  });
};

// Top 10

exports.getTop10 = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ views: -1 }).limit(10);
    res.status(200).json({
      success: true,
      movies,
    });
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

exports.updateMovie = async (req, res, next) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) {
    throw { code: 404, message: "movie is not found with this id" };
  }

  movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });

  res.status(200).json({
    success: true,
    movie,
  });
};

// Delete Movie --Admin

exports.deleteMovie = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    throw { code: 404, message: "movie is not found with this id" };
  }

  await movie.remove();

  res.status(200).json({
    success: true,
    message: "Movie deleted successfully",
  });
};

// Delete Movie User
exports.deleteMovieUser = async (req, res) => {
  try {
    const movie = await Movie.find({ userId: req.user._id });
    res.json(movie);
  } catch (err) {
    if (!err.code) {
      err.code = 500;
    }
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

// Single Movie Details

exports.getSingleMovie = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    throw { code: 404, message: "movie is not found with this id" };
  }
  res.status(200).json({
    success: true,
    movie,
    movieCount,
  });
};
