"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errors = exports.error = void 0;
var _responses = _interopRequireDefault(require("./responses.js"));
var error = exports.error = function error(message, code) {
  var e = new Error(message);
  if (code) {
    e.statusCode = code;
  }
  return e;
};
var errors = exports.errors = function errors(err, req, res, next) {
  console.error("[error]", err);
  var message = err.message || "Internal Error";
  var status = err.statusCode || 500;
  _responses["default"].error(req, res, message, status);
};