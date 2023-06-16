const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');

function expressConfig(app) {
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
  app.use(express.urlencoded({ extended: false }));
  //TODO: Setup the static files
  app.use(express.static(path.resolve(__dirname, "../static")));
  app.use(cookieParser());
  app.use(auth);
}

module.exports = expressConfig;
