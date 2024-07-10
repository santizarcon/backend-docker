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
routerAdmin.get("/admin", admin.showInfoReport);// PROBARLO

routerAdmin.post("/adminShow", admin.showInfoAdmin);
routerAdmin.post("/reportTools", admin.showInfoReportTools);


routerAdmin.get("/formNew", admin.showFormNew);
routerAdmin.get("/formDemage", admin.showFormDemage);
routerAdmin.get("/showBorrowTool", admin.showBorrowTool);

routerAdmin.get("/accounts", admin.showAccounts);
routerAdmin.post("/accounts", admin.delteAccounts);

routerAdmin.post("/ficha", admin.createficha);
routerAdmin.get("/ficha", admin.showFichas);
routerAdmin.delete("/ficha", admin.deleteFicha);
routerAdmin.put("/ficha", admin.updateFicha);

export default routerAdmin;