/**
 * Este es el controlador para el usuario
 * @module ctl-user
 */
import bcrypt from "bcrypt";
import response from "../messages/responses.js";
import { assignToken } from "../middleware/auth.js";
import { sendOTP } from "../middleware/mail.js";
import { generateCodeOTP } from "../middleware/otp.js";
import { pool } from "../models/database.js";

// BOTH

/**
 * Esta funcion sirve para loguearse el administrador y usuario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const login = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_read_logueo(?);`, [req.body.email]);
    if (data[0][0] === 0) {
      let message = "User doesn't exist";

      response.error(req, res, message, 404);
      return;
    }

    const match = await bcrypt.compare(
      req.body.password,
      data[0][0][0].password
    );

    if (!match) {
      let message = "Wrong password";
      response.error(req, res, message, 404);
      return;
    }

    const token = assignToken(data[0][0][0]);
    const info = data[0][0];
    response.success(req, res, { token, info }, 200);
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para actualizar todas las cuentas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const updateAccounts = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password.toString(), 10);

  try {
    const data = await pool.query(`CALL sp_update_cuentas(?, ?, ?, ?, ?);`, [
      req.body.email,
      req.body.password,
      req.body.nombre,
      req.body.apellido,
      req.body.estado,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item updated successful (Account)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't updated Account";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para crear y enviar el codigo OTP, para recuperar la
 * contraseña
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const sendMail = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_read_logueo(?);`, [req.body.email]);
    if (!data[0][0] >= 1) {
      let message = "Email doesn't exist";
      response.error(req, res, message, 404);
      return;
    }

    const otp = generateCodeOTP();
    sendOTP(req.body.email, otp);
    let message = "Otp sent to email: " + req.body.email;
    response.success(req, res, message, 200);
  } catch (err) {
    next(err);
  }
};

// Recuperar contraseña PROBARLO
const recoverPassword = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password.toString(), 10);

  try {
    const data = await pool.query(`CALL sp_update_cuentas(?, ?, ?, ?, ?);`, [
      req.body.email,
      req.body.password,
      "",
      "",
      "",
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item updated successful (password)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't updated password";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para crear cuentas de usuario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
// ONLY USER
const createUser = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password.toString(), 10);

  try {
    const data = await pool.query(`call sp_create_user(?, ?, ?, ?);`, [
      req.body.email,
      req.body.password,
      req.body.nombre,
      req.body.apellido,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (user)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add the user";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para eliminar el inactivo de los usuarios
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
// Eliminar recuperar cuenta PROBARLO pregunta si o no y listo
const deleteUser = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_delete_recuperar_cuenta(?)`, [
      req.body.email,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item delted successful (account)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't deleted the account";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};


/**
 * Esta funcion sirve para mostrara los datos dependiendo del el id USER
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showInfoUser = async (req, res, next) => {

  try {
    const data = await pool.query(`call sp_read_user(?);`, [
      req.body.id,
    ]);

    let message = data[0][0];
    response.success(req, res, message, 201);

  } catch (err) {
    next(err);
  };

};

/**
 * Esta funcion sirve para crear el carrito de herramientas a pedir
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createShopping = async (req, res, next) => {
  try {
    const data = await pool.query(
      `CALL sp_create_carrito_herramienta(?, ?, ?);`,
      [req.body.cantidad_herramienta, req.body.id_herramienta, req.body.id_user]
    );

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (shopping cart)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add Shopping Cart";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para crear los informes de solicitud de herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createReportRequest = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_create_informe_solicitud(?, ?);`, [
      req.body._numero_ficha,
      req.body.id_user,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (Report Request)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add Report Request";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para crear formularios para pedir una nueva herramienta
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createFormNew = async (req, res, next) => {
  try {
    const data = await pool.query(
      `call sp_create_formulario_nueva_herramienta(?, ?, ?, ?);`,
      [
        req.body.asunto,
        req.body.cantidad,
        req.body.descripcion,
        req.body.id_user,
      ]
    );

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (Form New Tool)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add Form New Tool";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para mostrar los formulario de nueva Herramienta para el usuario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const ShowFormNewUser = async (req, res, next) => {
  try {
    const data = await pool.query(
      `CALL sp_read_formulario_nueva_herramienta_user(?);`,
      [req.body.id_user]
    );

    let message = data[0][0];
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para crear formularios de daño de herramienta
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createFormDemage = async (req, res, next) => {
  try {
    const data = await pool.query(
      `call sp_create_formulario_dano_herramienta(?, ?, ?, ?, ?, ?);`,
      [
        req.body.asunto,
        req.body.cantidad,
        req.body.imagen,
        req.body.descripcion,
        req.body.id_user,
        req.body.id_herramienta,
      ]
    );

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (Form Demage Tool)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add Form Demage Tool";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para mostrar los formularios de nueva herramienta para usuario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const ShowFormDemageUser = async (req, res, next) => {
  try {
    const data = await pool.query(
      `CALL sp_read_formulario_dano_herramienta_user(?);`,
      [req.body.id_user]
    );

    let message = data[0][0];
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para enlazar las fichas correspondientes a cada usuario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createUserFicha = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_create_user_ficha(?, ?)`, [
      req.body.id_user,
      req.body.numero_ficha,
    ]);

    let message = "Item created successful (User-Ficha)";
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para mostrar las fichas que tiene cada usuario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showFichasUser = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_read_user_ficha(?)`, [
      req.body.id_user,
    ]);

    let message = data[0][0];
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para mostrar un mensaje de que el token si es valido
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 */
const validateToken = (req, res) => {
  response.success(req, res, { token: "El token es valido" }, 200);
};

export default {
  login,
  updateAccounts,
  sendMail,
  recoverPassword,
  createUser,
  deleteUser,
  showInfoUser,
  createShopping,
  createReportRequest,
  createFormNew,
  ShowFormNewUser,
  createFormDemage,
  ShowFormDemageUser,
  showFichasUser,
  createUserFicha,
  validateToken,
};
