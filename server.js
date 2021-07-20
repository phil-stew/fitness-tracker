const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3010;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
const apiRoute = (require("./routes/apiRoutes.js"));
// const htmlRoute = (require("./routes/htmlRoutes.js"));

app.use(apiRoute)
// app.use(htmlRoute)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
