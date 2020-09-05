import express from "express";
const express = require("express");

const configMiddleware = require("./configMiddleware.js");

const server = express();
configMiddleware(server);

server.get("/", (req, res) => res.send("Server is up and running"));
module.exports = server;
