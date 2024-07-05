import user from "../controllers/controller.user.js";
import express from "express";
import { checkAuth } from "../services/security.js";

/**
 * Esta es la ruta del usuario
 * @type {object}
 */
const routerUser = express.Router();

// RUTAS
routerUser.post("/login", user.login);

routerUser.put("/account", user.updateAccounts);
routerUser.post("/account", user.createCodeOTP);
routerUser.delete("/account", user.deleteCodeOTP); 

// ONLY USER
routerUser.post("/user", user.createUser);
routerUser.delete("/user", user.deleteUser)

routerUser.post("/shopping", user.createShopping);
routerUser.post("/reportRequest", user.createReportRequest);

routerUser.post("/formNewUser", user.createFormNew)
routerUser.get("/formNewUser", user.ShowFormNewUser)

routerUser.post("/formDemageUser", user.createFormDemage)
routerUser.get("/formDemageUser", user.ShowFormDemageUser)

routerUser.post("/fichaUser", user.createUserFicha);
routerUser.get("/fichaUser", user.showFichasUser);

// checkAuth
// Para validar el token
routerUser.post("/oauth", checkAuth, user.validarToken);

export default routerUser;
