const sessions = new Map();

const getContext = (userId) => sessions.get(userId) || [];

const appendContext = (userId, entry) => {
	const context = getContext(userId);
	if (context.length >= 10) context.shift(); // Keep max 10 messages
	context.push(entry);
	sessions.set(userId, context);
};

export default {
	getContext,
	appendContext,
};
