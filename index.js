import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import chatRoutes from "./routes/chat.js";

dotenv.config();
const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

app.post("/login", (req, res) => {
	const { username } = req.body;
	if (!username) return res.status(400).json({ error: "Username required" });

	// fake user
	const token = jwt.sign({ id: username }, JWT_SECRET, { expiresIn: "1h" });
	res.json({ token });
});

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
