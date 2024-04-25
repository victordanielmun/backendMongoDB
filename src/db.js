import mongoose from "mongoose";
import { URI } from "./config";

/**
 * Asynchronously connects to the MongoDB database using mongoose.
 *
 * @return {Promise<void>} Resolves once the connection is established successfully.
 */
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
