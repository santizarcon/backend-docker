import swaggerAutogen from "swagger-autogen";
import { config } from "dotenv";
config();

let port = process.env.PORT || 3000;

const doc = {
  info: {
    title: "BACKEND",
    description: "manejo de usuarios",
  },
  host: "localhost:" + port + "/api",
};
// crea un archivo de tipo json
const outputFile = "./swagger-output.json";
const routes = [
  "../routes/routes.user.js",
  "../routes/routes.admin.js",
  "../routes/routes.tool.js",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
