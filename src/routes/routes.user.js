import express from "express";
import user from "../controllers/controller.user.js";
import { checkOTP } from "../middleware/otp.js";
import { checkAuth } from "../services/security.js";

/**
 * Esta es la ruta del usuario
 * @type {object}
 */
const routerUser = express.Router();

// RUTAS
routerUser.post("/login", user.login);

routerUser.put("/account", user.updateAccounts);

routerUser.post("/sendOTP", user.sendMail);
routerUser.put("/recoverPassword", user.recoverPassword);

// ONLY USER
routerUser.post("/user", user.createUser);
routerUser.delete("/user", user.deleteUser); 
routerUser.get("/user", user.showInfoUser); 

routerUser.post("/shopping", user.createShopping);
routerUser.post("/reportRequest", user.createReportRequest);

routerUser.post("/formNewUser", user.createFormNew);
routerUser.get("/formNewUser", user.ShowFormNewUser);

routerUser.post("/formDemageUser", user.createFormDemage);
routerUser.get("/formDemageUser", user.ShowFormDemageUser);

routerUser.post("/fichaUser", user.createUserFicha);
routerUser.get("/fichaUser", user.showFichasUser);

// checkAuth
// Para validar el token
routerUser.post("/oauth", checkAuth, user.validateToken);
routerUser.post("/oauthOTP", checkOTP);

export default routerUser;
