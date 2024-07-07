"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllerTool = _interopRequireDefault(require("../controllers/controller.tool.js"));
var _security = require("../services/security.js");
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
routerTool.post("/cartTool", _controllerTool["default"].createToolCart);
routerTool.post("/showCartTool", _controllerTool["default"].showToolCart);
var _default = exports["default"] = routerTool;