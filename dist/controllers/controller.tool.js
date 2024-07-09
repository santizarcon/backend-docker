"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _responses = _interopRequireDefault(require("../messages/responses.js"));
var _database = require("../models/database.js");
/**
 * Este es el controlador de las herramientas
 * @module ctl-tool
 */

/**
 * Esta funcion sirve para crear nuevas herramientas para el inventario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var createTool = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data, message, _message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _database.pool.query("CALL sp_create_herramienta(?, ?, ?, ?, ?, ?)", [req.body.nombre_herramienta, req.body.imagen, req.body.descripcion, req.body.cantidad_total, req.body.referencia, req.body.id_admin]);
        case 3:
          data = _context.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item created successful (tool)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message = "Could't add the new tool";
            _responses["default"].error(req, res, _message, 400);
          }
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createTool(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para actualizar los datos de las herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var updateTool = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _database.pool.query("CALL sp_update_herramienta(?, ?, ?, ?, ? ,?, ?, ?)", [req.body.id, req.body.nombre_herramienta, req.body.imagen, req.body.descripcion, req.body.cantidad_disponible, req.body.cantidad_total, req.body.referencia, req.body.id_admin]);
        case 3:
          data = _context2.sent;
          message = "Item Updated successful (tool)";
          _responses["default"].success(req, res, message, 201);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function updateTool(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para eliminar las herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var deleteTool = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var data, message, _message2;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _database.pool.query("CALL sp_delete_herramienta(?)", [req.body.id]);
        case 3:
          data = _context3.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item Deteled successful (tool)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message2 = "Could't deleted the tool";
            _responses["default"].error(req, res, _message2, 400);
          }
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function deleteTool(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar todas las herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showTool = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _database.pool.query("CALL sp_read_herramienta()");
        case 3:
          data = _context4.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function showTool(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve añadir las herramientas al carrito
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var createToolCart = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var data, message, _message3;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _database.pool.query("CALL sp_create_carrito_herramienta(?, ?, ?)", [req.body.cantidad_herramienta, req.body.id_herramienta, req.body.id_user]);
        case 3:
          data = _context5.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item created successful (cart tool)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message3 = "Could't add the new cart tool";
            _responses["default"].error(req, res, _message3, 400);
          }
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function createToolCart(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve mostrar las herramientas del carrito
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showToolCart = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _database.pool.query("CALL sp_read_carrito(?)", [req.body.id_user]);
        case 3:
          data = _context6.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function showToolCart(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve eliminar las herramientas del carrito
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var deleteToolCart = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var data, message, _message4;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _database.pool.query("CALL sp_delete_carrito_herramienta(?)", [req.body.id_carrito_herramienta]);
        case 3:
          data = _context7.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item delete successful (cart tool)";
            _responses["default"].success(req, res, message, 200);
          } else {
            _message4 = "Could't delete cart tool";
            _responses["default"].error(req, res, _message4, 500);
          }
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function deleteToolCart(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createTool: createTool,
  updateTool: updateTool,
  deleteTool: deleteTool,
  showTool: showTool,
  createToolCart: createToolCart,
  showToolCart: showToolCart,
  deleteToolCart: deleteToolCart
};