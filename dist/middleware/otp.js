"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCodeOTP = exports.checkOTP = void 0;
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _responses = _interopRequireDefault(require("../messages/responses"));
var secretOTP = _speakeasy["default"].generateSecret().base32;
var generateCodeOTP = exports.generateCodeOTP = function generateCodeOTP() {
  return _speakeasy["default"].totp({
    secret: secretOTP,
    encoding: "base32",
    step: 5 * 60
  });
};
var checkOTP = exports.checkOTP = function checkOTP(req, res) {
  var verify = _speakeasy["default"].totp.verify({
    secret: secretOTP,
    encoding: "base32",
    token: req.body.otp,
    step: 5 * 60
  });
  if (verify) {
    var message = "OTP code successfully verified";
    _responses["default"].success(req, res, message, 200);
  } else {
    var _message = "The OTP code is invalid or has expired";
    _responses["default"].success(req, res, _message, 200);
  }
};