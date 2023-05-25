const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

module.exports = (app) => {
  //TODO: Setup the view engine
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
    })
  );

  app.set("view engine", "hbs");
  app.set("views", "src/views");

  //TODO: Setup the body parser

  //TODO: Setup the static files
  app.use(express.static("src/static"));
};
