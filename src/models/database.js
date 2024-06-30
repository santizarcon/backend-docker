import { createPool } from "mysql2/promise";
import config from "../config/index.js";

/**
 * Sirve para conectarme a mi base de datos
 * @type {object}
 */
const dbconfig = {
  port: config.mysql.port,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

export const pool = createPool(dbconfig);
