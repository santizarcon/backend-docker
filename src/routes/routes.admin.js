import admin from "../controllers/controller.admin.js";
import express from "express";
import { checkAuth } from "../services/security.js";

/**
 * Esta es la ruta del administrador
 * @type {object}
 */
const routerAdmin = express.Router();

// RUTAS
routerAdmin.post("/admin", admin.createSubAdmin);
routerAdmin.put("/admin", admin.updateStateReport);// PROBARLO

routerAdmin.post("/adminShow", admin.showInfoAdmin);

routerAdmin.post("/formNew", admin.showFormNew);
routerAdmin.post("/formDemage", admin.showFormDemage);

routerAdmin.get("/accounts", admin.showAccounts);
routerAdmin.put("/accounts", admin.updateResponsible);// PROBARLO
routerAdmin.post("/accounts", admin.delteAccounts);

routerAdmin.post("/ficha", admin.createficha);
routerAdmin.get("/ficha", admin.showFichas);
routerAdmin.delete("/ficha", admin.deleteFicha);
routerAdmin.put("/ficha", admin.updateFicha);

export default routerAdmin;