/**
 * Este es el controlador para el administrador
 * @module ctl-admin
 */
import bcrypt from "bcrypt";
import response from "../messages/responses.js";
import { pool } from "../models/database.js";


/**
 * Esta funcion sirve para crear cuentas de SubAdmin
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createSubAdmin = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password.toString(), 10);

  try {
    const data = await pool.query(`call sp_create_subAdmin(?, ?, ?, ?);`, [
      req.body.email,
      req.body.password,
      req.body.nombre,
      req.body.apellido,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (subAdmin)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add the new subAdmin";
      response.error(req, res, message, 400);
    };

  } catch (err) {
    next(err);
  };

};

/**
 * Esta funcion sirve para mostrara los datos dependiendo del el id ADMIN
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showInfoAdmin = async (req, res, next) => {

  try {
    const data = await pool.query(`call sp_read_admin(?);`, [
      req.body.id,
    ]);

    let message = data[0][0];
    response.success(req, res, message, 201);

  } catch (err) {
    next(err);
  };

};


// Actualizar el estado del Informe de solicitud PROBARLO
const updateStateReport = async(req, res, next) =>{
  try {
    const data = await pool.query(`CALL sp_update_informe_solicitud(?, ?)`, [
      req.body.id,
      req.body.estado,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item updated successful (Request Report)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't updated the Request Report";
      response.error(req, res, message, 400);
    };

  } catch (err) {
    next(err);
  };
};

// Actualizar los Responsable de la Herramientas PROBARLO
const updateResponsible = async(req, res, next) =>{
  try {
    const data = await pool.query(`CALL sp_update_responsabilidad_herramienta(?, ?)`, [
      req.body.id,
      req.body.id_user,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item updated successful (Tool Manager)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't updated the Tool Manager";
      response.error(req, res, message, 400);
    };

  } catch (err) {
    next(err);
  };
};

/**
 * Esta funcion sirve para mostrar los formularios de peticion para una nueva herramienta
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showFormNew = async(req, res, next) =>{
  try {
    const data = await pool.query(`CALL sp_read_formulario_nueva_herramienta()`);

    let message = data[0][0];
    response.success(req, res, message, 201);

  } catch (err) {
    next(err);
  };
};

/**
 * Esta funcion sirve para mostrar los formularios de reporte de daños de herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showFormDemage = async(req, res, next) =>{
  try {
    const data = await pool.query(`CALL sp_read_formulario_daño_herramienta()`);

    let message = data[0][0];
    response.success(req, res, message, 201);

  } catch (err) {
    next(err);
  };
};

/**
 * Esta funcion sirve para mostrar todas cuentas 
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showAccounts = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_read_cuentas()`);

    let message = data[0][0];
    response.success(req, res, message, 201);

  } catch (err) {
    next(err);
  };
};

/**
 * Esta funcion sirve para pasar las cuentas a la tabla cuentas eliminadas, para eliminarlas en un tiempo determinado
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const delteAccounts = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_create_cuentas_eliminadas(?, ?)`,[
      req.body.id_user,
      req.body.id_admin,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (User to delete)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add the new user for delete";
      response.error(req, res, message, 400);
    };

  } catch (err) {
    next(err);
  };
};

/**
 * Esta funcion sirve para crear nuevas fichas 
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createficha = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_create_fichas(?, ?, ?, ?, ?)`, [
      req.body.numero_ficha,
      req.body.cantidad_aprendices,
      req.body.nivel_formacion,
      req.body.programa_formacion,
      req.body.ambiente,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item create successful (ficha)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add the new ficha";
      response.error(req, res, message, 400);
    };


  } catch (err) {
    next(err);
  };
};


/**
 * Esta funcion sirve para eliminar fichas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const deleteFicha = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_delete_fichas(?)`, [
      req.body.numero_ficha,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item deleted successful (ficha)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't deleted the ficha";
      response.error(req, res, message, 400);
    };


  } catch (err) {
    next(err);
  };
};

/**
 * Esta funcion sirve para actualizar los datos de las fichas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const updateFicha = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_update_fichas(?, ?, ?, ?, ?, ?, ?)`, [
      req.body.id,
      req.body.numero_ficha,
      req.body.cantidad_aprendices,
      req.body.nivel_formacion,
      req.body.programa_formacion,
      req.body.ambiente,
      req.body.estado,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item updated successful (ficha)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't updated the ficha";
      response.error(req, res, message, 400);
    };


  } catch (err) {
    next(err);
  };
};

/**
 * Esta funcion sirve mostrar todas las fichas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showFichas = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_read_fichas()`);

    let message = data[0][0];
    response.success(req, res, message, 201);

  } catch (err) {
    next(err);
  };
};


export default {
  createSubAdmin,
  showInfoAdmin,
  updateStateReport,
  showFormNew,
  showFormDemage,
  showAccounts,
  updateResponsible,
  delteAccounts,
  createficha,
  deleteFicha,
  updateFicha,
  showFichas
};