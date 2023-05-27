const env = process.env.NODE_ENV || "development";

const config = require("./config/config")[env];
const express = require("express");
const app = express();
const expressConfig = require("./config/express");
const routes = require("./config/routes");

expressConfig(app);
app.use(routes);

app.listen(
  config.port,
  console.log(`Listening on port ${config.port}! Now its up to you...`)
);
