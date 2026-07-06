import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import insuranceRoutes from "./routes/insuranceRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import retirementRoutes from "./routes/retirementRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: process.env.client_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard")
app.use("/api/insurance", insuranceRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/retirement", retirementRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Aphelion API Running"
    });
});

app.get("/api/dashboard", protect, (req, res) => {
    res.json({
        success: true,
        message: "Protected Dashboard",
        user: req.user,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});