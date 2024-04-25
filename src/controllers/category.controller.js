import Category from "../models/category.model.js";

/**
 * Retrieves a list of all categories and sends them as a JSON response.
 *
 * @param {Object} res - The response object to send the list of categories.
 * @return {Promise<void>} - A Promise that resolves when the list of categories is sent.
 */
export const listCategorys = async ( res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * Retrieves a category by its ID and sends it as a JSON response.
 *
 * @param {Object} req - The request object containing the category ID in the params.
 * @param {Object} res - The response object to send the category.
 * @return {Promise<void>} - A Promise that resolves when the category is sent.
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Creates a new category with the provided information and saves it to the database.
 *
 * @param {Object} req - The request object containing the category data in the body.
 * @param {Object} res - The response object to send the result.
 * @return {Promise<void>} - A Promise that resolves when the category is saved successfully.
 */
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json({ message: "Category saved", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a category by its ID with the provided information and sends the updated category as a JSON response.
 *
 * @param {Object} req - The request object containing the category ID in the params and the updated category data in the body.
 * @param {Object} res - The response object to send the updated category.
 * @return {Promise<void>} - A Promise that resolves when the category is updated successfully and sent as a JSON response. If the category is not found, a 404 status code is sent with a "Category not found" message.
 */
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a category by its ID and sends the deleted category as a JSON response.
 *
 * @param {Object} req - The request object containing the category ID in the params.
 * @param {Object} res - The response object to send the deleted category.
 * @return {Promise<void>} - A Promise that resolves when the category is deleted successfully and sent as a JSON response. If the category is not found, a 404 status code is sent with a "Category not found" message.
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

