const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const languages = require("./data/languages.json");
const compile = require("./controllers/compilationController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app
  .get("/", async (req, res) => {
    try {
      res.status(200).json(languages);
    } catch (err) {}
  })
  .post("/", compile);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development")
    console.log(`App running on port ${PORT}`);
});
