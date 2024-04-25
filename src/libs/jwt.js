import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

/**
 * Creates an access token using the provided payload.
 *
 * @param {Object} payload - The payload to be used for creating the token.
 * @return {Promise<string>} A promise that resolves with the generated access token.
 */
export function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
