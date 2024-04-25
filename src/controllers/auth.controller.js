import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

/**
 * Register a new user with the provided user information.
 *
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send back the result.
 * @return {Object} JSON response with the success status and user details if successful, error message if not.
 */
export const register = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.json({
      success: true,
      id: userSaved._id,
      userName: userSaved.userName,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back the result.
 * @return {Object} The response object with the success status and user details if successful, error message if not.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    } else {
      const token = await createAccesToken({ id: userFound._id });
      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.json({
        success: true,
        id: userFound._id,
        userName: userFound.userName,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Logs out a user by clearing the access token cookie.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The response status for successful logout.
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves the profile information of a user.
 *
 * @param {Object} req - The request object containing the user's ID.
 * @param {Object} res - The response object to send back the user's profile information.
 * @return {Promise<Object>} The user's profile information, including ID, username, email, creation date, and last update date.
 * @throws {Object} If the user is not found, returns a 401 status code with a message indicating that the user was not found.
 */
export const getProfile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound)
      return res.sendStatus(401).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
