import { checkToken } from "../middleware/auth.js";

export const checkAuth = (req, res, next) => {
  const id = req.body.id;
  checkToken.confirmToken(req, id);

  next();
};
