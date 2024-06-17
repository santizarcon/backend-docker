"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.query = exports.each = exports.all = exports.add = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
var _index = _interopRequireDefault(require("../config/index.js"));
var dbconfig = {
  host: _index["default"].mysql.host,
  user: _index["default"].mysql.user,
  password: _index["default"].mysql.password,
  database: _index["default"].mysql.database
};
var connection;
var connMysql = function connMysql() {
  connection = _mysql["default"].createConnection(dbconfig);
  connection.connect(function (err) {
    if (err) {
      console.log("[db err]", err);
      setTimeout(connMysql, 2000);
    } else {
      console.log("db connected");
    }
  });
  connection.on("error", function (err) {
    console.log("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connMysql();
    } else {
      throw err;
    }
  });
};
connMysql();
var all = exports.all = function all(table) {
  return new Promise(function (resolve, reject) {
    connection.query("select * from ".concat(table), function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  });
};
var each = exports.each = function each(table, id) {
  return new Promise(function (resolve, reject) {
    connection.query("select * from ".concat(table, " where id = ").concat(id), function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  });
};
var add = exports.add = function add(table, data) {
  return new Promise(function (resolve, reject) {
    connection.query("insert into ".concat(table, " set ? on duplicate key update ?"), [data, data], function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  });
};
var remove = exports.remove = function remove(table, data) {
  return new Promise(function (resolve, reject) {
    connection.query("delete from ".concat(table, " where id = ?"), data.id, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  });
};
var query = exports.query = function query(table, _query) {
  return new Promise(function (resolve, reject) {
    connection.query("select * from ".concat(table, " where ?"), _query, function (error, result) {
      return error ? reject(error) : resolve(result[0]);
    });
  });
};