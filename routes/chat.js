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

	const history = sessionStore.getContext(userId);
	const contextPrompt = history.map((h) => `User: ${h.user}\nBot: ${h.bot}`).join("\n\n");
	const fullPrompt = contextPrompt ? `${contextPrompt}\n\nUser: ${message}` : message;

	try {
		const response = await axios.post("https://rag-endpoint.vercel.app/api/rag/generate", {
			question: fullPrompt,
		});

		const answer = response.data.answer;
		const context = response.data.context || [];

		sessionStore.appendContext(userId, { user: message, bot: answer });

		res.json({ answer, context });
	} catch (err) {
		console.error("RAG API error:", err.message);
		res.status(500).json({ error: "Failed to get response from RAG API" });
	}
});

export default router;
