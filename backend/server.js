import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// ===== SERVE FRONTEND (VITE BUILD) =====
const __dirname = path.resolve();

// Serve static files
app.use(express.static(path.join(__dirname, "front-end/dist")));

// SPA fallback (important)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end/dist", "index.html"));
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
