import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import contentRoutes from "./routes/content.route.js";
import categoryRoutes from "./routes/category.route.js";

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//CORS
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-todo-app-ytpf.onrender.com" ]
  }));

//Routes
app.use("/api",authRoutes);
app.use("/api",contentRoutes);
app.use("/api",categoryRoutes);

export default app;