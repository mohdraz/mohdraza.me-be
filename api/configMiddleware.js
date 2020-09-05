const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const middleWares = [express.json(), helmet(), cors()];
module.exports = (server) => {
  return server.use(middleWares);
};
