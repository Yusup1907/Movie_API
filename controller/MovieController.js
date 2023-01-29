const Movie = require("../models/MovieModels");
const Features = require("../utils/Features");

exports.createMovie = async (req, res, next) => {
  console.log(req.body); // Menambahkan console.log untuk mengecek nilai dari req.body
  const { title, description, duration, artist, genre, videos } = req.body;
  try {
    const movie = new Movie({
      title,
      description,
      duration,
      artist,
      genre,
      videos,
    });
    console.log(movie); // Menambahkan console.log untuk mengecek nilai dari movie
    await movie.save();
    res.status(201).json({
      status: "success",
      data: movie,
    });
  } catch (err) {
    console.log(err); // Menambahkan console.log untuk mengecek nilai dari err
    res.status(400).json({
      status: "fail",
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

// Add Movie --User

exports.addMovie = async (req, res) => {
  try {
    // Menemukan film
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    if (!movie.selectedBy) movie.selectedBy = [];

    // Memeriksa apakah pengguna sudah memilih film ini sebelumnya
    if (movie.selectedBy.includes(req.user.id))
      return res.status(400).json({ msg: "Movie already selected" });

    // Menambahkan ID pengguna ke array "selectedBy" pada film
    movie.selectedBy.push(req.user.id);
    await movie.save();
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Delete Movie User
exports.deleteMovieUser = async (req, res) => {
  try {
    // Menemukan film
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    // Memeriksa apakah pengguna sudah memilih film ini sebelumnya
    const index = movie.selectedBy.indexOf(req.user.id);
    if (index === -1)
      return res.status(400).json({ msg: "Movie not selected" });

    // Menghapus ID pengguna dari array "user" pada film
    movie.selectedBy.splice(index, 1);
    await movie.save();
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
