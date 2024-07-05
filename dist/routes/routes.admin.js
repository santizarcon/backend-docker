"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _controllerAdmin = _interopRequireDefault(require("../controllers/controller.admin.js"));
var _express = _interopRequireDefault(require("express"));
var _security = require("../services/security.js");
/**
 * Esta es la ruta del administrador
 * @type {object}
 */
var routerAdmin = _express["default"].Router();

// RUTAS
routerAdmin.post("/admin", _controllerAdmin["default"].createSubAdmin);
routerAdmin.put("/admin", _controllerAdmin["default"].updateStateReport); // PROBARLO

routerAdmin.get("/formNew", _controllerAdmin["default"].showFormNew);
routerAdmin.get("/formDemage", _controllerAdmin["default"].showFormDemage);
routerAdmin.get("/accounts", _controllerAdmin["default"].showAccounts);
routerAdmin.put("/accounts", _controllerAdmin["default"].updateResponsible); // PROBARLO
routerAdmin.post("/accounts", _controllerAdmin["default"].delteAccounts);
routerAdmin.post("/ficha", _controllerAdmin["default"].createficha);
routerAdmin.get("/ficha", _controllerAdmin["default"].showFichas);
routerAdmin["delete"]("/ficha", _controllerAdmin["default"].deleteFicha);
routerAdmin.put("/ficha", _controllerAdmin["default"].updateFicha);
var _default = exports["default"] = routerAdmin;