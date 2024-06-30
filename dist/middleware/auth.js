"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = exports.assignToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("../config/index.js"));
var _errors = require("../messages/errors.js");
var secret = _index["default"].jwt.secret;
var assignToken = exports.assignToken = function assignToken(data) {
  return _jsonwebtoken["default"].sign(data, secret);
};
var verifyToken = function verifyToken(token) {
  return _jsonwebtoken["default"].verify(token, secret);
};
var checkToken = exports.checkToken = {
  confirmToken: function confirmToken(req) {
    var decoded = decodeHeader(req);

    // if (decoded.id !== id) {
    //   throw error("You don't have privileges to do this", 401);
    // }
  }
};
var getToken = function getToken(authorization) {
  if (!authorization) {
    throw (0, _errors.error)("No token has been obtained", 401);
  }
  if (authorization.indexOf("Bearer") === -1) {
    throw (0, _errors.error)("Invalid format", 401);
  }
  var token = authorization.replace("Bearer ", "");
  return token;
};
var decodeHeader = function decodeHeader(req) {
  var authorization = req.headers.authorization;
  var token = getToken(authorization);
  var decoded = verifyToken(token);
  req.user = decoded;
  return decoded;
};