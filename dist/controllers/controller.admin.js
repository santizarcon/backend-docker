"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _responses = _interopRequireDefault(require("../messages/responses.js"));
var _database = require("../models/database.js");
/**
 * Este es el controlador para el administrador
 * @module ctl-admin
 */

/**
 * Esta funcion sirve para crear cuentas de SubAdmin
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var createSubAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data, message, _message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _bcrypt["default"].hash(req.body.password.toString(), 10);
        case 2:
          req.body.password = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return _database.pool.query("call sp_create_subAdmin(?, ?, ?, ?);", [req.body.email, req.body.password, req.body.nombre, req.body.apellido]);
        case 6:
          data = _context.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item create successful (subAdmin)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message = "Could't add the new subAdmin";
            _responses["default"].error(req, res, _message, 400);
          }
          ;
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          next(_context.t0);
        case 14:
          ;
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 11]]);
  }));
  return function createSubAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve actualizar el estado de solicitud del informe de solicitud
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var updateStateReport = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data, message, _message2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _database.pool.query("CALL sp_update_informe_solicitud(?, ?)", [req.body.id, req.body.estado]);
        case 3:
          data = _context2.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item updated successful (Request Report)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message2 = "Could't updated the Request Report";
            _responses["default"].error(req, res, _message2, 400);
          }
          ;
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function updateStateReport(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar la informacion de peticion de las herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showInfoReport = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _database.pool.query("CALL sp_read_informe_solicitud_admin()");
        case 3:
          data = _context3.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function showInfoReport(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrara los datos dependiendo del el id ADMIN
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showInfoAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _database.pool.query("call sp_read_admin(?);", [req.body.id]);
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
          ;
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function showInfoAdmin(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar la informacion de las herramientas de cada inventario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showInfoReportTools = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _database.pool.query("call sp_read_informe_carrito(?);", [req.body.id_informe]);
        case 3:
          data = _context5.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function showInfoReportTools(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar los formularios de peticion para una nueva herramienta
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showFormNew = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _database.pool.query("CALL sp_read_formulario_nueva_herramienta()");
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
          ;
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function showFormNew(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar los formularios de reporte de daños de herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showFormDemage = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _database.pool.query("CALL sp_read_formulario_da\xF1o_herramienta()");
        case 3:
          data = _context7.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function showFormDemage(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar el usuario que tiene las herramientas prestadas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showBorrowTool = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _database.pool.query("CALL sp_read_herramientas_prestadas()");
        case 3:
          data = _context8.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context8.next = 11;
          break;
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function showBorrowTool(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para mostrar todas cuentas 
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showAccounts = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return _database.pool.query("CALL sp_read_cuentas()");
        case 3:
          data = _context9.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          next(_context9.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 8]]);
  }));
  return function showAccounts(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para pasar las cuentas a la tabla cuentas eliminadas, para eliminarlas en un tiempo determinado
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var delteAccounts = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var data, message, _message3;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _database.pool.query("CALL sp_create_cuentas_eliminadas(?, ?)", [req.body.id_user, req.body.id_admin]);
        case 3:
          data = _context10.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item create successful (User to delete)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message3 = "Could't add the new user for delete";
            _responses["default"].error(req, res, _message3, 400);
          }
          ;
          _context10.next = 11;
          break;
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 8]]);
  }));
  return function delteAccounts(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para crear nuevas fichas 
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var createficha = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var data, message, _message4;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _database.pool.query("CALL sp_create_fichas(?, ?, ?, ?, ?)", [req.body.numero_ficha, req.body.cantidad_aprendices, req.body.nivel_formacion, req.body.programa_formacion, req.body.ambiente]);
        case 3:
          data = _context11.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item create successful (ficha)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message4 = "Could't add the new ficha";
            _responses["default"].error(req, res, _message4, 400);
          }
          ;
          _context11.next = 11;
          break;
        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          next(_context11.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 8]]);
  }));
  return function createficha(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para eliminar fichas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var deleteFicha = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var data, message, _message5;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _database.pool.query("CALL sp_delete_fichas(?)", [req.body.numero_ficha]);
        case 3:
          data = _context12.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item deleted successful (ficha)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message5 = "Could't deleted the ficha";
            _responses["default"].error(req, res, _message5, 400);
          }
          ;
          _context12.next = 11;
          break;
        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          next(_context12.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 8]]);
  }));
  return function deleteFicha(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve para actualizar los datos de las fichas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var updateFicha = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var data, message, _message6;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _database.pool.query("CALL sp_update_fichas(?, ?, ?, ?, ?, ?, ?)", [req.body.id, req.body.numero_ficha, req.body.cantidad_aprendices, req.body.nivel_formacion, req.body.programa_formacion, req.body.ambiente, req.body.estado]);
        case 3:
          data = _context13.sent;
          if (data[0].affectedRows >= 1) {
            message = "Item updated successful (ficha)";
            _responses["default"].success(req, res, message, 201);
          } else {
            _message6 = "Could't updated the ficha";
            _responses["default"].error(req, res, _message6, 400);
          }
          ;
          _context13.next = 11;
          break;
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          next(_context13.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 8]]);
  }));
  return function updateFicha(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();

/**
 * Esta funcion sirve mostrar todas las fichas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
var showFichas = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res, next) {
    var data, message;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return _database.pool.query("CALL sp_read_fichas()");
        case 3:
          data = _context14.sent;
          message = data[0][0];
          _responses["default"].success(req, res, message, 201);
          _context14.next = 11;
          break;
        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          next(_context14.t0);
        case 11:
          ;
        case 12:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 8]]);
  }));
  return function showFichas(_x40, _x41, _x42) {
    return _ref14.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  createSubAdmin: createSubAdmin,
  updateStateReport: updateStateReport,
  showInfoReport: showInfoReport,
  showInfoReportTools: showInfoReportTools,
  showInfoAdmin: showInfoAdmin,
  showFormNew: showFormNew,
  showFormDemage: showFormDemage,
  showBorrowTool: showBorrowTool,
  showAccounts: showAccounts,
  delteAccounts: delteAccounts,
  createficha: createficha,
  deleteFicha: deleteFicha,
  updateFicha: updateFicha,
  showFichas: showFichas
};