import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import chatRoutes from "./routes/chat.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined")); // Logging middleware

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
