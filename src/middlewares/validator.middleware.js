
/**
 * Validates the request body against a given schema and calls the next middleware if successful.
 * If validation fails, it returns a 400 status code with an error message.
 *
 * @param {Object} schema - The schema to validate the request body against.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} - If validation succeeds, calls the next middleware. If validation fails, returns a 400 status code with an error message.
 */
export const validateSchema = (schema) => async (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.errors.map((err) => err.message) });
  }
};
