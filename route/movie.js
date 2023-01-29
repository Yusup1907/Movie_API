const express = require("express");
const { createMovie, getAllMovie, updateMovie, deleteMovie, getSingleMovie, deleteMovieUser, getTop10, addMovie } = require("../controller/MovieController.js");
const { isAuthUser, authorizeRoles } = require("../middleware/auth.js");
const router = express.Router();

router.route("/movie/new").post(isAuthUser, authorizeRoles("admin"), createMovie);
router.route("/movies").get(getAllMovie);
router.route("/movies/top10").get(getTop10);

router
  .route("/movie/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateMovie)
  .delete(isAuthUser, authorizeRoles("admin"), deleteMovie)
  .get(getSingleMovie);

router.route("/movie/:id/select").post(isAuthUser, authorizeRoles("user"), addMovie);
router.route("/movie/:id/unselect").post(isAuthUser, authorizeRoles("user"), deleteMovieUser);

module.exports = router;
