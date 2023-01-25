const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/Database");



// config
dotenv.config({
  path: "config/.env",
});

// Connect Database
connectDatabase();

// Creat Server

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});



