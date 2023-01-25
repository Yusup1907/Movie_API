const express = require("express");
const { createMovie, getAllMovie, updateMovie, deleteMovie, getSingleMovie, deleteMovieUser } = require("../controller/MovieController.js");
const { isAuthUser, authorizeRoles } = require("../middleware/auth.js");
const router = express.Router();

router
.route("/movie/new")
.post(isAuthUser, authorizeRoles("admin"), createMovie);
router.route("/movies").get(getAllMovie);

router
  .route("/movie/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateMovie)
  .delete(isAuthUser, authorizeRoles("admin"), deleteMovie)
  .delete(isAuthUser, authorizeRoles("user"), deleteMovieUser)
  .get(getSingleMovie);


module.exports = router;
