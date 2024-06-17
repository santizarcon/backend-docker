"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.success = exports.error = void 0;
var success = exports.success = function success(req, res, message, status) {
  res.status(status).send({
    error: false,
    status: status,
    body: message
  });
};
var error = exports.error = function error(req, res, message, status) {
  res.status(status).send({
    error: true,
    status: status,
    body: message
  });
};