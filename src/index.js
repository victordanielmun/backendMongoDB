import app from "./app.js";
import { connectDB } from "./db.js";
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => console.log("Server started on port 5000"));
