import './loadEnv.js';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import path from "path";
import allRoutes from "./routes/allRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

connectDB();

app.get("/", (req,res) => {
    res.send("Hello from server");
});
//routes
app.use("/api", allRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});