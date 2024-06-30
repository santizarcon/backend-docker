import response from "./responses.js";

export const error = (message, code) => {
  let e = new Error(message);
  if (code) {
    e.statusCode = code;
  }

  return e;
};

export const errors = (err, req, res, next) => {
  console.error("[error]", err);

  const message = err.message || "Internal Error";
  const status = err.statusCode || 500;

  response.error(req, res, message, status);
};
