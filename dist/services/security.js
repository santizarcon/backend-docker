"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = void 0;
var _auth = require("../middleware/auth.js");
var checkAuth = exports.checkAuth = function checkAuth(req, res, next) {
  var id = req.body.id;
  _auth.checkToken.confirmToken(req, id);
  next();
};