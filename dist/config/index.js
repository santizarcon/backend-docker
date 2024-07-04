"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var _default = exports["default"] = {
  app: {
    port: process.env.PORT
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  mysql: {
    port: process.env.MYSQL_ADDON_PORT,
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
  }
};