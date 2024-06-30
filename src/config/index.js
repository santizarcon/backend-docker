import { config } from "dotenv";
config();

export default {
  app: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JET_SECRET,
  },
  mysql: {
    port: process.env.MYSQL_ADDON_PORT,
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
  },
};
