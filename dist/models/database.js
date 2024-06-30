"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;
var _promise = require("mysql2/promise");
var _index = _interopRequireDefault(require("../config/index.js"));
/**
 * Sirve para conectarme a mi base de datos
 * @type {object}
 */
var dbconfig = {
  port: _index["default"].mysql.port,
  host: _index["default"].mysql.host,
  user: _index["default"].mysql.user,
  password: _index["default"].mysql.password,
  database: _index["default"].mysql.database
};
var pool = exports.pool = (0, _promise.createPool)(dbconfig);