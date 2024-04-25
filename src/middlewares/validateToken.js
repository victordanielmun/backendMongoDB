import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    const {access_token} = req.cookies;

  try {

    if (!access_token) return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(access_token, TOKEN_SECRET, (error, user) => {
      if (error) return res.status(401).json({ message: "Token is not valid" });
      console.log("user", user);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
