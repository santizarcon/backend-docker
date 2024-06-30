import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { error } from "../messages/errors.js";

const secret = config.jwt.secret;

export const assignToken = (data) => {
  return jwt.sign(data, secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

export const checkToken = {
  confirmToken: (req) => {
    const decoded = decodeHeader(req);

    // if (decoded.id !== id) {
    //   throw error("You don't have privileges to do this", 401);
    // }
  },
};

const getToken = (authorization) => {
  if (!authorization) {
    throw error("No token has been obtained", 401);
  }
  if (authorization.indexOf("Bearer") === -1) {
    throw error("Invalid format", 401);
  }

  let token = authorization.replace("Bearer ", "");

  return token;
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization;
  const token = getToken(authorization);
  const decoded = verifyToken(token);

  req.user = decoded;

  return decoded;
};
