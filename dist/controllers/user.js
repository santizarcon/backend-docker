"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _auth = require("../middleware/auth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var table = "user";
var _default = exports["default"] = function _default(dbInjected) {
  var db = dbInjected;
  if (!db) {
    throw new Error("could not connect to the database");
  }
  var all = function all() {
    return db.all(table);
  };
  function each(id) {
    return db.each(table, id);
  }
  var login = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, password) {
      var data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.query(table, {
              email: email
            });
          case 2:
            data = _context.sent;
            return _context.abrupt("return", _bcrypt["default"].compare(password, data.password).then(function (result) {
              if (result) {
                // Generate token
                return (0, _auth.assignToken)(_objectSpread({}, data));
              } else {
                throw new Error("Invalid information");
              }
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function login(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var add = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcrypt["default"].hash(body.password.toString(), 10);
          case 2:
            body.password = _context2.sent;
            return _context2.abrupt("return", db.add(table, body));
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function add(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var remove = function remove(body) {
    return db.remove(table, body);
  };
  return {
    all: all,
    login: login,
    add: add,
    remove: remove
  };
};