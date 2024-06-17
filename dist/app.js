"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _index = _interopRequireDefault(require("./config/index.js"));
var _user = _interopRequireDefault(require("./routes/user.js"));
var _errors = require("./messages/errors.js");
var app = (0, _express["default"])();

// Middleware
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

// Configuration
app.set("port", _index["default"].app.port);

// Routes
app.use("/api/user", _user["default"]);
app.use(_errors.errors);
var _default = exports["default"] = app;