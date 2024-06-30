import { Router } from "express";
import routerUser from "./routes.user.js";
import routerAdmin from "./routes.admin.js";
import routerTool from "./routes.tool.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from '../tools/swagger-output.json';

/**
 * Esta es la ruta principal de mi proyecto
 * @type {object}
 */
const router = Router();

// RUTAS
router.use("/api", routerUser);
router.use("/api", routerAdmin);
router.use("/api", routerTool);
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));


export default router;
