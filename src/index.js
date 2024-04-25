import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(3001, () => console.log("Server started on port 3001s"));