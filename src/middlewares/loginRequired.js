import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export default async function loginRequired(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        errors: ['Login required'],
      });
    }

    const [, token] = authorization.split(' ');

    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { email, id } = dados;

    const user = await userModel.getUser(email);

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userEmail = email;
    req.userId = id;

    next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token inválido ou expirado'],
    });
  }
}
