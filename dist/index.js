"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app.js"));
_app["default"].listen(_app["default"].get("port"), function () {
  console.log("Server in the port: ", _app["default"].get("port"));
});