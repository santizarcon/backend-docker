"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _security = require("../services/security.js");
var _controllerTool = _interopRequireDefault(require("../controllers/controller.tool.js"));
var _express = _interopRequireDefault(require("express"));
/**
 * Esta es la ruta de las herramientas
 * @type {object}
 */
var routerTool = _express["default"].Router();

// ROUTES
routerTool.post("/tool", _security.checkAuth, _controllerTool["default"].createTool);
routerTool.put("/tool", _controllerTool["default"].updateTool);
routerTool["delete"]("/tool", _controllerTool["default"].deleteTool);
routerTool.get("/tool", _controllerTool["default"].showTool);
var _default = exports["default"] = routerTool;