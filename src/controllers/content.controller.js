import Content from "../models/content.model.js";

/**
 * Retrieves a list of all contents.
 *
 * @param {Object} res - The response object to send back the list of contents.
 * @return {Promise<void>} - Returns a Promise that resolves when the list of contents is successfully retrieved and sent as a JSON response.
 *                           - If an error occurs, the Promise resolves with a 500 status code and an error message as a JSON response.
 */
export const listContents = async ( res) => {
    try {
      const contents = await Content.find();
      res.json(contents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

/**
 * Retrieves user-specific contents based on the user ID.
 *
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object to send back the user-specific contents.
 * @return {Promise<void>} - Returns a Promise that resolves when the user-specific contents are successfully retrieved and sent as a JSON response.
 *                           - If an error occurs, the Promise resolves with a 500 status code and an error message as a JSON response.
 */
export const getUserContents = async (req, res) => {
    try {
      const contents = await Content.find({ user: req.user.id });
      res.json(contents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  /**
 * Retrieves a content by its ID and sends it as a JSON response.
 *
 * @param {Object} req - The request object containing the content ID in the params.
 * @param {Object} res - The response object to send the content.
 * @return {Promise<void>} - A Promise that resolves when the content is sent.
 */
export const getContentById = async (req, res) => {
    try {
      const content = await Content.findById(req.params.id);
      if (!content) return res.status(404).json({ message: "Content not found" });
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

/**
 * Creates a new content with the provided information and saves it to the database.
 *
 * @param {Object} req - The request object containing the content data in the body.
 * @param {Object} res - The response object to send the result.
 * @return {Promise<void>} - A Promise that resolves when the content is saved successfully.
 */
export const createContent = async (req, res) => {
    try {
      const { title, description, contentPath, category} = await req.body;
      const newContent = new Content({
        title,
        description,
        contentPath,
        category,
        user: req.user.id,
      });
      const contentSaved = await newContent.save();
      res.json({ message: "Content saved", contentSaved });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


/**
 * Updates a content by its ID with the provided information and sends the updated content as a JSON response.
 *
 * @param {Object} req - The request object containing the content ID in the params and the updated content data in the body.
 * @param {Object} res - The response object to send the updated content.
 * @return {Promise<void>} - A Promise that resolves when the content is updated successfully and sent as a JSON response. If the content is not found, a 404 status code is sent with a "Content not found" message.
 */
export const updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a content by its ID and sends the deleted content as a JSON response.
 *
 * @param {Object} req - The request object containing the content ID in the params.
 * @param {Object} res - The response object to send the deleted content.
 * @return {Promise<void>} - A Promise that resolves when the content is deleted successfully and sent as a JSON response. If the content is not found, a 404 status code is sent with a "Content not found" message.
 */
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json({ message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
