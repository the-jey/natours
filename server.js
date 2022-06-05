const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err, next) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down ...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Configure the path of the dotenv file
dotenv.config({ path: "./config.env" });

// Import the app (always after ENV VAR)
const app = require("./app");

// Replacing the placeholder string with the DB password
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect to mongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfull ✔️"));

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on :${port} ... 🏃`);
});

process.on("unhandleRejection", (err) => {
  console.log("UNHANDLER REJECTION 💥 Shutting down ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
