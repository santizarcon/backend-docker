"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var port = process.env.PORT || 3000;
var doc = {
  info: {
    title: "Seguridad",
    description: "manejo de usuarios"
  },
  host: "localhost:" + port + "/api"
};
// crea un archivo de tipo json
var outputFile = "./swagger-output.json";
var routes = ["../routes/routes.user.js", "../routes/routes.admin.js", "../routes/routes.tool.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

(0, _swaggerAutogen["default"])()(outputFile, routes, doc);