const mongoose = require("mongoose");
require("dotenv").config();
<<<<<<< HEAD
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
=======
const DB_HOST = process.env.DB_HOST;

const db = mongoose.connect(DB_HOST, {
>>>>>>> bda0a48d258d4f7eae697f5b24b3947c6cad181a
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close(() => {
    console.log("connection for db closed and app termination");
    process.exit(1);
  });
});
<<<<<<< HEAD

module.exports = db;
=======
>>>>>>> bda0a48d258d4f7eae697f5b24b3947c6cad181a
