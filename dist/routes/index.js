"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _routesUser = _interopRequireDefault(require("./routes.user.js"));
var _routesAdmin = _interopRequireDefault(require("./routes.admin.js"));
var _routesTool = _interopRequireDefault(require("./routes.tool.js"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../tools/swagger-output.json"));
/**
 * Esta es la ruta principal de mi proyecto
 * @type {object}
 */
var router = (0, _express.Router)();

// RUTAS
router.use("/api", _routesUser["default"]);
router.use("/api", _routesAdmin["default"]);
router.use("/api", _routesTool["default"]);
router.use('/doc', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
var _default = exports["default"] = router;