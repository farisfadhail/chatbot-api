import express from "express";
import axios from "axios";
import authenticate from "../middleware/auth.js";
import sessionStore from "../utils/sessionStore.js";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
	const { message } = req.body;
	const userId = req.user.id;

	if (!message) {
		return res.status(400).json({ error: "Message is required" });
	}

	const context = sessionStore.getContext(userId);

	try {
		const response = await axios.post(
			"https://rag-endpoint.vercel.app/api/rag/generate",
			{
				message,
				context,
			},
			{ timeout: 3000 }
		);

		const reply = response.data.response;
		sessionStore.appendContext(userId, { user: message, bot: reply });

		res.json({ response: reply });
	} catch (err) {
		console.error("RAG Error:", err.message);
		res.status(500).json({ error: "Failed to get response from RAG" });
	}
});

export default router;
