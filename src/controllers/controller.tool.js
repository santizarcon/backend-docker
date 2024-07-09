/**
 * Este es el controlador de las herramientas
 * @module ctl-tool
 */
import response from "../messages/responses.js";
import { pool } from "../models/database.js";

/**
 * Esta funcion sirve para crear nuevas herramientas para el inventario
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createTool = async (req, res, next) => {
  try {
    const data = await pool.query(
      `CALL sp_create_herramienta(?, ?, ?, ?, ?, ?)`,
      [
        req.body.nombre_herramienta,
        req.body.imagen,
        req.body.descripcion,
        req.body.cantidad_total,
        req.body.referencia,
        req.body.id_admin,
      ]
    );

    if (data[0].affectedRows >= 1) {
      let message = "Item created successful (tool)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add the new tool";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para actualizar los datos de las herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const updateTool = async (req, res, next) => {
  try {
    const data = await pool.query(
      `CALL sp_update_herramienta(?, ?, ?, ?, ? ,?, ?, ?)`,
      [
        req.body.id,
        req.body.nombre_herramienta,
        req.body.imagen,
        req.body.descripcion,
        req.body.cantidad_disponible,
        req.body.cantidad_total,
        req.body.referencia,
        req.body.id_admin,
      ]
    );

    let message = "Item Updated successful (tool)";
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para eliminar las herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const deleteTool = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_delete_herramienta(?)`, [
      req.body.id,
    ]);

    if (data[0].affectedRows >= 1) {
      let message = "Item Deteled successful (tool)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't deleted the tool";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve para mostrar todas las herramientas
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showTool = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_read_herramienta()`);

    let message = data[0][0];
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve añadir las herramientas al carrito
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const createToolCart = async (req, res, next) => {
  try {
    const data = await pool.query(
      `CALL sp_create_carrito_herramienta(?, ?, ?)`,
      [req.body.cantidad_herramienta, req.body.id_herramienta, req.body.id_user]
    );

    if (data[0].affectedRows >= 1) {
      let message = "Item created successful (cart tool)";
      response.success(req, res, message, 201);
    } else {
      let message = "Could't add the new cart tool";
      response.error(req, res, message, 400);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Esta funcion sirve mostrar las herramientas del carrito
 * @param {object} req Captura peticiones en HTML
 * @param {object} res Envia peticiones en HTML
 * @param {object} next Sirve para pasar a la siguiente instruccion
 */
const showToolCart = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_read_carrito(?)`, [
      req.body.id_user,
    ]);
    let message = data[0][0];
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
};

const deleteToolCart = async (req, res, next) => {
  try {
    const data = await pool.query(`CALL sp_delete_carrito_herramienta(?)`, [
      req.body.id_carrito_herramienta,
    ]);
    if (data[0].affectedRows >= 1) {
      let message = "Item delete successful (cart tool)";
      response.success(req, res, message, 200);
    } else {
      let message = "Could't delete cart tool";
      response.error(req, res, message, 500);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  createTool,
  updateTool,
  deleteTool,
  showTool,
  createToolCart,
  showToolCart,
  deleteToolCart,
};
